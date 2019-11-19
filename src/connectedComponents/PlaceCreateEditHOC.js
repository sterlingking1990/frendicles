import React from 'react'
import moment from 'moment'

export default class PlaceCreateEditHOC extends React.Component{
    constructor(props){
        super(props);
        this.state={hooks:this.props.place.hooks?this.props.place.hooks:[],place_name:this.props.place.place_name?this.props.place.place_name:'',description:this.props.place.description?this.props.place.description:'',image:this.props.place.image?this.props.place.image:'',contact:this.props.place.contact?this.props.place.contact:'',createdAt:this.props.place.createdAt?this.props.createdAt:moment().format().valueOf(),count:0,error:''}
        this.keepHookID=this.keepHookID.bind(this)
        this.keepImageName=this.keepImageName.bind(this)
        this.keepPlaceName=this.keepPlaceName.bind(this)
        this.keepPlaceContact=this.keepPlaceContact.bind(this)
        this.keepPlaceDescription=this.keepPlaceDescription.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    keepHookID=(e)=>{
        let count=this.state.count
        let hook_state=this.state.hooks
        let id = e.target.value;
        if(!(hook_state.includes(id))){
            hook_state[count] = id
            count+=1;
            this.setState({ hooks:hook_state,count })
        }
        else{
            let new_hook=hook_state.filter((hook)=>hook!==id)
            let new_count=(this.state.hook.length)-1;
            this.setState({ hooks: new_hook, count:new_count })
        }

    }

    keepPlaceName=(e)=>{
        let place_name=e.target.value
        this.setState({place_name})
    }

    keepPlaceContact=(e)=>{
        let contact=e.target.value
        this.setState({contact})
    }

    keepPlaceDescription=(e)=>{
        let description=e.target.value
        this.setState({description})
    }

    keepImageName=(e)=>{
        let image_name=e.target.value
        this.setState({image:image_name})
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(!this.state.description || !this.state.place_name || !this.state.image || !this.state.contact){
            this.setState({error:'Please fill all the missing fields'})
        }
        else{
            this.props.onSubmit({ hooks: this.state.hooks, place_name: this.state.place_name, description: this.state.description, image: this.state.image, contact: this.state.contact, createdAt: this.state.createdAt })
            this.setState({error:''})
        }
        
    }

    render(){
        return(
            <div id="create-place">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <p className="display-4 text-success text-center">Create Place for HookUp</p>
                            {!!this.state.error && <p className="bg-dark text-white">{this.state.error}</p> }
                            <div className="form-group">
                                <input type="text" placeholder="enter the place name" value={this.state.place_name} className="form-control" onChange={this.keepPlaceName}/>
                            </div>
                            <div className="form-group">
                                <textarea cols="6" rows="5" placeholder="describe the place" value={this.state.description} className="form-control"  onChange={this.keepPlaceDescription}/>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="enter contact address/phone" value={this.state.contact} className="form-control" onChange={this.keepPlaceContact}/>
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="enter image url" className="form-control" value={this.state.image} onChange={this.keepImageName}/>
                            </div>
                            <p className="bg-dark text-white">What hooks relate to this place?</p>
                            <div className="form-check-inline">
                            
                            {this.props.hooks.map((hook) =>
                                <span className="mx-2"><label className="mx-1" for={hook.hook}>{hook.hook}</label><input className="form-check-input" name={hook.hook} type="checkbox" value={hook.id} checked={this.state.hooks.includes(hook.id)?true:false} onChange={this.keepHookID}/></span>)}
                            </div>
                            <div className="form-group mt-2">
                                <button className="form-control btn-dark text-white" onClick={this.handleSubmit}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}