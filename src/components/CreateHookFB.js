import React from 'react'
import {withFirebase} from '../firebase'
import { setTimeout } from 'timers';


const INITIAL_DETAILS={
    hooks:[],
    loading:false,
    hook_name:'',
    description:'',
    isCreated:false,
    isEmpty:false,
    searchText:'',
}
class CreateHookFB extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_DETAILS}
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    searchDatabase=event=>{
        let searchText=event.target.value;
        this.setState({searchText:searchText})
        //set the hooks to respond to search event
        this.props.firebase.hooks().orderByChild("hook_name").startAt(this.state.searchText).limitToFirst(1).on("value",searchResult=>{
            const hookObject=searchResult.val()
            const notEmptyResult = !!hookObject && searchText !== ""
            
            if(notEmptyResult){
            const hookList=Object.keys(hookObject).map(key=>({
                ...hookObject[key],uid:key
            }))
            this.setState({hooks:hookList})
            }
            else{
            this.props.firebase.hooks().on("value",refreshList=>{
                const hookObjectRefresh=refreshList.val()
                const hookListRefresh=Object.keys(hookObjectRefresh).map(key=>({
                    ...hookObjectRefresh[key],uid:key
                }))
                this.setState({hooks:hookListRefresh})
            })
            
        }
        })
    }

    createHook=event=>{
        const {hook_name,description}=this.state
        const isEmpty=hook_name==='' || description ===''
        if(isEmpty===false){
        this.props.firebase.hooks().push({
            hook_name:hook_name,
            description:description,
        })

        this.setState({hook_name:'',description:'',isCreated:true,isEmpty:false})

        setTimeout(function(){
            this.setState({isCreated:false})

        }.bind(this),3000)

        event.preventDefault();
    }
    else{
        this.setState({isEmpty:true})
    }
    }

    onRemoveHook=uid=>{
        this.props.firebase.hook(uid).remove()
    }

    saveEditedHook=(hook_name,description,hook_id)=>{
        this.props.firebase.hook(hook_id).set({
            hook_name,
            description
        })
    }

    componentDidMount(){
        this.setState({loading:true,isCreated:false});
        this.props.firebase.hooks().on('value',snapshot=>{
            const hookObject=snapshot.val();
            if(hookObject){
                const hookList=Object.keys(hookObject).map(key=>({
                    ...hookObject[key],uid:key
                }))
                this.setState({hooks:hookList,loading:false,isCreated:false})
            }
            else{
                this.setState({hooks:null,loading:true})
            }
            
        });
    }

    render(){
        const {hook_name,description,hooks,loading,isCreated,isEmpty,searchText}=this.state

        return(
        <div>
            <div id="create-hook">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                        <h3 className="display-4 text-center">Create Hook</h3>
                        {isCreated && <p className="text-center bg-dark text-white">Created Successfully</p>}
                        {isEmpty && <p className="text-center bg-red text-red">Either hook name or description is empty</p>}
                        <div className="form-group">
                            <input name="hook_name" type="text" className="form-control" value={hook_name} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <textarea name="description" className="form-control" cols="6" rows="5" value={description} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <button className="form-control my-3 bg-dark text-white" onClick={this.createHook}>Save</button>                            
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            <h3 className="display-4 text-center text-dark">Hooks</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" name="searchText" value={searchText} onChange={this.searchDatabase}/>
                            </div>
                            {loading && <p className="text-white bg-dark text-center">loading...</p>}
                            {hooks?<HookList hooks={hooks} onRemoveHook={this.onRemoveHook} saveEditedHook={this.saveEditedHook}/>:<p className="text-white bg-dark text-center">No hooks available, create hooks</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const HookList=({hooks,onRemoveHook,saveEditedHook})=>(
    <div>
        {hooks.map(hook=>(
            <HookTemplate key={hook.uid} hook_id={hook.uid} hook_name={hook.hook_name} hook_description={hook.description} onRemoveHook={onRemoveHook} saveEditedHook={saveEditedHook}/>
        ))}
    </div>
)

class HookTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={hook_name:this.props.hook_name,hook_description:this.props.hook_description,hook_id:this.props.hook_id,isToEdit:false}
    }

    toggleEdit=()=>{
        this.setState({isToEdit:true})
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    updateHook=()=>{
        const {hook_name,hook_description,hook_id}=this.state
        this.props.saveEditedHook(hook_name,hook_description,hook_id)
        this.setState({isToEdit:false})
    }

    resetHook=event=>{
        this.setState({hook_name:this.props.hook_name,hook_description:this.props.hook_description,hook_id:this.props.hook_id})
        event.preventDefault()
    }

    render(){
        const {hook_name,hook_description,hook_id,isToEdit}=this.state
        return(
            <div>
            {isToEdit ? (
                <div className = "card my-1">
                    <div className = "card-title" >
                        <div className="card-body">
                            <div className="form-group">
                                <input name="hook_name" type="text" className="form-control" value={hook_name} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input name="hook_description" type="text-area" className="form-control" cols="6" rows="5" value={hook_description} onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <button className="form-control bg-dark text-white" onClick={this.updateHook}>Save</button> 
                            </div>
                            <div className="form-group">
                                <button className="form-control bg-dark text-white" onClick={this.resetHook}>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>):(<div className="card my-1">
                            <div className="card-title">
                                <div className="card-body">
                                    <span className="text-left" id="edit_delete_hook"><i className="fa fa-remove" onClick={() => this.props.onRemoveHook(hook_id)}></i></span><span className="text-right"><i className="fa fa-edit" onClick={this.toggleEdit}></i></span>
                                        <p className="text-center"> {hook_name}</p>
                                        <p className="text-center">{hook_description}</p>
                                </div>
                            </div>
                        </div>
                        )}
                </div>
        )
    }
}

export default withFirebase(CreateHookFB)