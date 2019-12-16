import React from 'react'
import {withFirebase} from '../firebase'


const INITIALS={
    places:[],
    hooks:[],
    place_name:'',
    description:'',
    contact:'',
    image:'',
    place_hooks:[],
    toEdit:'',
    isCreated:false,
    count:0,
    loading_hooks:false,
    loading_places:false,
}

class CreatePlaceFB extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...INITIALS }
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    keepHookID=e=>{
        let count = this.state.count
        let hook_state = this.state.place_hooks
        let id = e.target.value;
        if (!(hook_state.includes(id))) {
            hook_state[count] = id
            count += 1;
            this.setState({ place_hooks: hook_state, count })
        }
        else{
            let new_hook_state=this.state.place_hooks.filter(hook=>hook!==id)
            let new_count=this.state.count-1
            this.setState({place_hooks:new_hook_state,count:new_count})
        }

    }

    onDeletePlace=uid=>{
        this.props.firebase.place(uid).remove()
    }

    onPlaceUpdate=(place_name,description,image,place_hooks,place_id,contact)=>{
        this.props.firebase.place(place_id).set({
            place_name,
            description,
            contact,
            image,
            place_hooks,
        })

    }

    handleSubmit=event=>{
        const {place_name,description,contact,image,place_hooks}=this.state
        const isPlaceName=place_name!==""
        const isDescription=description!==""
        const isContact=contact!==""
        const isImage=image!==""
        const isPlaceHooks=place_hooks!==null
        const proceedToSubmit=isPlaceName && isDescription && isContact && isImage && isPlaceHooks 
        if(proceedToSubmit){
            this.props.firebase.places().push({
                place_name,
                description,
                contact,
                image,
                place_hooks,
            })
            this.setState({isCreated:true})
        }
        else{
            this.setState({isCreated:false})
        }

        event.preventDefault()
    }

    componentDidMount(){
        this.setState({loading_hooks:true,loading_places:true,isCreated:false})
        this.props.firebase.hooks().once("value",snapShot=>{
            const hookObject=snapShot.val()
            const hookList=Object.keys(hookObject).map(key=>({
                ...hookObject[key],uid:key
            }))
            this.setState({hooks:hookList})
        })

        this.props.firebase.places().on("value",placeSnapShot=>{
            const placeObject=placeSnapShot.val()
            const placeList=Object.keys(placeObject).map(key=>({
                ...placeObject[key],uid:key
            }))
            this.setState({places:placeList})
        })
        this.setState({loading_hooks:false,loading_places:false})

    }

    render(){
        const {place_name,description,contact,image,place_hooks,hooks,loading_hooks,loading_places,isCreated,places}=this.state
        return(
            <div id="create-place">
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-lg-12">
                            {isCreated && <p className="text-center text-white bg-dark">place created successfully</p>}
                            <p className="display-4 text-success text-center">Create Place for HookUp</p>
                            <div className="form-group">
                                <input type="text" name="place_name" placeholder="enter the place name" value={place_name} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <textarea cols="6" rows="5" name="description" placeholder="describe the place" value={description} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="contact" placeholder="enter contact address/phone" value={contact} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="image" placeholder="enter image url" className="form-control" value={image} onChange={this.onChange} />
                            </div>
                            <p className="bg-dark text-white">What hooks relate to this place?</p>
                            <div className="form-check-inline">
                            {loading_hooks &&<p className="text-center bg-dark text-white"></p>}
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" value={hook.uid} checked={place_hooks.includes(hook.uid) ? true : false} onChange={this.keepHookID} /></span>)}
                            </div>
                            <div className="form-group mt-2">
                                <button className="form-control btn-dark text-white" onClick={this.handleSubmit}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>

                    <div className="container mt-2">
                        <div className="row">
                        {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                        <Places places={places} hooks={hooks} onDeletePlace={this.onDeletePlace} onPlaceUpdate={this.onPlaceUpdate}/>
                        </div>
                    </div>
            </div>


        )
    }



    

}

const Places=({places,hooks,onDeletePlace,onPlaceUpdate})=>(
    <div>
        {places.map(place=>(
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} onDeletePlace={onDeletePlace} onPlaceUpdate={onPlaceUpdate}/>
        ))}
    </div>
)

class PlaceTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={isToEdit:false,place_name:this.props.place.place_name,description:this.props.place.description,image:this.props.place.image,contact:this.props.place.contact,hooks:this.props.hooks,place_hooks:this.props.place.place_hooks,place_id:this.props.place_id,hook_count:this.props.place.place_hooks.length}

    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    onDeletePlace=()=>{
        this.props.onDeletePlace(this.state.place_id)
    }

    togglePlaceEdit=()=>{
        this.setState({isToEdit:true})
    }

    updateHookID=e=>{
        let place_hooks=this.state.place_hooks
        let hook_count=this.state.hook_count
        hook_count+=1
        let hook_id=e.target.value
        if(!(place_hooks.includes(hook_id))){
            place_hooks[hook_count]=hook_id
            this.setState({hook_count,place_hooks})
        }
        else{
            let new_place_hook=this.state.place_hooks.filter(place_hook=>place_hook!==hook_id)
            let new_hook_count=this.state.hook_count-1
            this.setState({place_hooks:new_place_hook,hook_count:new_hook_count})
        }
        
        

    }

    updatePlace=()=>{
        const {place_name,description,image,place_hooks,place_id,contact}=this.state
        this.props.onPlaceUpdate(place_name,description,image,place_hooks,place_id,contact)
        this.setState({isToEdit:false})
    }

    handleReset=event=>{
        this.setState({place_name:this.props.place.place_name,description:this.props.place.description,image:this.props.place.image,place_hooks:this.props.place.place_hooks,contact:this.props.place.contact})
        event.preventDefault()
    }

    render(){
        const {place_name,description,image,contact,isToEdit,place_hooks,hooks}=this.state

        return(
            <div className="col-lg-12 sm-12">
                <h3 className="display-4 text-center text-white mt-2">PLACES</h3>
                {isToEdit ?
                    <div id="edit_form">
                        <div className="form-group">
                            <input type="text" name="place_name" placeholder="enter the place name" value={place_name} className="form-control" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <textarea cols="6" rows="5" name="description" placeholder="describe the place" value={description} className="form-control" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="contact" placeholder="enter contact address/phone" value={contact} className="form-control" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="image" placeholder="enter image url" className="form-control" value={image} onChange={this.onChange} />
                        </div>
                        <p className="bg-dark text-white">What hooks relate to this place?</p>
                        <div className="form-check-inline">
                            {hooks.map((hook) =>
                                <span className="mx-2"><label className="mx-1" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" value={hook.uid} checked={place_hooks.includes(hook.uid) ? true : false} onChange={this.updateHookID} /></span>)}
                        </div>
                        <div className="form-group mt-2">
                            <button className="form-control btn-dark text-white" onClick={this.updatePlace}>Save Changes</button>
                        </div>
                        <div className="form-group mt-2">
                            <button className="form-control btn-dark text-white" onClick={this.handleReset}>Reset</button>
                        </div>

                    </div> : 

                    <div className="card bg-dark">
                        <span className="text-right text-sm text-display"><i className="fa fa-remove mx-2 text-red" id="delete_place" onClick={this.onDeletePlace}></i><i className="fa fa-edit mx-2 text-white" onClick={this.togglePlaceEdit}></i></span>
                        <div className="card-title">
                            <p className="display-4 text-center text-white">{place_name}</p>
                        </div>
                        <div className="card-body">
                            <div className="card-image">
                                <img src={image} className="img-responsive img-fluid" />
                            </div>
                            <p className="text-display p-2 text-white">{description}</p>
                            <p className="text-display p-2 text-white">{contact}</p>
                            <div className="form-check-inline">
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1 text-white" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" checked={place_hooks.includes(hook.uid) ? true : false} /></span>)}
                            </div>
                        </div>
                    </div>
                
                }
             
            </div>

        )
    }
}



export default withFirebase(CreatePlaceFB)