import React from 'react'
import {withFirebase} from '../firebase'
import { AuthUserContext } from '../session';

const subject="Ofatri - New Offer Available"
const update_subject="Ofatri - Offer Update"

const INITIALS={
    places:[],
    hooks:[],
    place_name:'',
    description:'',
    contact:'',
    ig_acct:'',
    youtube_term:'',
    email:'',
    subaccount:'',
    image:'',
    place_hooks:[],
    toEdit:'',
    isCreated:false,
    count:0,
    loading_hooks:false,
    loading_places:false,
    user_id:'',
}

class CreatePlaceFB extends React.Component{
    constructor(props){
        super(props);
        this.state = { ...INITIALS }
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.places().on("value", placeSnapShot => {
                const placeObject = placeSnapShot.val()
                const placeList = Object.keys(placeObject).map(key => ({
                    ...placeObject[key], uid: key
                }))
                const places_you_created = placeList.filter(place => place.userId === authUser.uid)
                this.setState({ places: places_you_created,user_id:authUser.uid})
                console.log(places_you_created)
            })

        })

        

        

        this.setState({ loading_hooks: true, loading_places: true, isCreated: false })
        this.props.firebase.hooks().once("value", snapShot => {
            const hookObject = snapShot.val()
            const hookList = Object.keys(hookObject).map(key => ({
                ...hookObject[key], uid: key
            }))
            this.setState({ hooks: hookList })
        })
        
        this.setState({ loading_hooks: false, loading_places: false })

    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }))
        }
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

    onPlaceUpdate=(userId,place_name,description,image,place_hooks,place_id,contact,ig_acct,youtube_term,email,subaccount)=>{
        this.props.firebase.imageStore(image.name).put(image).on("state_changed", snapShot => {
            //get the progress
            const progress = Math.round((snapShot.bytesTransfered / snapShot.totalBytes) * 100)

            this.setState({ progress });
        }, error => {
            console.log(error)
        }, () => {
            //complete the image storage
            this.props.firebase.imageStores().child(image.name).getDownloadURL().then(url => {
                this.props.firebase.place(place_id).set({
                userId:userId,
                place_name:place_name,
                description:description,
                contact:contact,
                ig_acct:ig_acct,
                youtube_term:youtube_term,
                email:email,
                subaccount:subaccount,
                image:url,
                place_hooks:place_hooks,
            
            })
            this.props.firebase.sendEmail(update_subject, place_name, url , description);
        })
    })

    }

    handleSubmit=authUser=>{
        const {place_name,description,contact,ig_acct,youtube_term,email,subaccount,image,place_hooks}=this.state
        const isPlaceName=place_name!==""
        const isDescription=description!==""
        const isContact=contact!==""
        //const isSubaccount=subaccount!==""
        const isImage=image!==""
        const isPlaceHooks=place_hooks!==null
        const proceedToSubmit=isPlaceName && isDescription && isContact && isImage && isPlaceHooks 
        if(proceedToSubmit){
            //upload the image
            this.props.firebase.imageStore(image.name).put(image).on("state_changed", snapShot => {
                //get the progress
                const progress = Math.round((snapShot.bytesTransfered / snapShot.totalBytes) * 100)

                this.setState({ progress });
            }, error => {
                console.log(error)
            }, () => {
                //complete the image storage
                this.props.firebase.imageStores().child(image.name).getDownloadURL().then(url => {
                    this.props.firebase.places().push({
                    userId:authUser.uid,
                    place_name:place_name,
                    description:description,
                    contact:contact,
                    ig_acct:ig_acct,
                    youtube_term:youtube_term,
                    email:email,
                    subaccount:subaccount,
                    image:url,
                    place_hooks:place_hooks,
                })
                this.setState({isCreated:true})
                //send mail to all registered users about new created place
                this.props.firebase.sendEmail(subject, place_name, url, description);
                })
            })   
        }
        else{
            this.setState({isCreated:false})
        }
    }

    render(){
        const {user_id,place_name,description,contact,ig_acct,youtube_term,email,subaccount,place_hooks,hooks,loading_hooks,loading_places,isCreated,places}=this.state
        return(
                
                <div id="create-place">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>
                <AuthUserContext>
                    {authUser => (
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12">
                            {isCreated && <p className="text-center text-white bg-dark">offer created successfully</p>}
                            <p className="card-title text-success text-center">Create Promotional Offer</p>
                            <div className="form-group">
                                <input type="text" name="place_name" placeholder="enter offer name" value={place_name} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <textarea cols="6" rows="5" name="description" placeholder="describe the offer" value={description} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="contact" placeholder="enter phone number(whatsApp)" value={contact} className="form-control" onChange={this.onChange} />
                            </div>
                                    <div className="form-group">
                                        <input type="text" name="ig_acct" placeholder="enter ID id" value={ig_acct} className="form-control" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name="youtube_term" placeholder="enter youtube term" value={youtube_term} className="form-control" onChange={this.onChange} />
                                    </div>
                            <div className="form-group">
                                <input type="text" name="email" placeholder="enter email address" value={email} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" name="subaccount" placeholder="enter subaccount number" value={subaccount} className="form-control" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="file" id="myFile" className="form-control" name="image" onChange={this.handleImageChange} />
                                {/* <input type="text" name="image" placeholder="enter image url" className="form-control" value={image} onChange={this.onChange} /> */}
                            </div>
                            <p className="bg-dark text-white">What hooks relate to this offer?</p>
                            <div className="form-check-inline">
                            {loading_hooks &&<p className="text-center bg-dark text-white"></p>}
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" value={hook.uid} checked={place_hooks.includes(hook.uid) ? true : false} onChange={this.keepHookID} /></span>)}
                            </div>
                            <div className="form-group mt-2">
                                <button className="form-control btn-dark text-white" onClick={()=>this.handleSubmit(authUser)}>Submit</button>
                            </div>

                        </div>
                    </div>
                </div>
                    )}
                </AuthUserContext>
              
        
                    <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                        {places.length>0 ? <div><p className="card-title text-center text-white mt-2">Offers You Created</p>
                        {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                        <Places places={places} hooks={hooks} onDeletePlace={this.onDeletePlace} onPlaceUpdate={this.onPlaceUpdate} user_id={user_id}/></div>
                        : <h3 className="display-4 text-center text-dark mt-2">You Have not created any Offer Yet, Create Promotional Offer And Start Getting Closed Deals From Customers</h3>}
                        </div>
                    </div>
                    </div>
                    </div>
              
        )
    }



    

}

const Places=({places,hooks,onDeletePlace,onPlaceUpdate,user_id})=>(
    <div>
        {places.map(place=>(
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} onDeletePlace={onDeletePlace} onPlaceUpdate={onPlaceUpdate} user_id={user_id}/>
        ))}
    </div>
)

class PlaceTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={userId:this.props.user_id,isToEdit:false,place_name:this.props.place.place_name,user_id:this.props.place.userId,description:this.props.place.description,image:this.props.place.image,contact:this.props.place.contact,ig_acct:this.props.place.ig_acct,youtube_term:this.props.place.youtube_term,email:this.props.place.email,subaccount:this.props.place.subaccount,hooks:this.props.hooks?this.props.hooks:[],place_hooks:this.props.place.place_hooks?this.props.place.place_hooks:[],place_id:this.props.place_id,hook_count:this.props.place.place_hooks?this.props.place.place_hooks.length:0}

    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    handleImageChange = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }))
        }
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
        const {userId,place_name,description,image,place_hooks,place_id,contact,ig_acct,youtube_term,email,subaccount}=this.state
        this.props.onPlaceUpdate(userId,place_name,description,image,place_hooks,place_id,contact,ig_acct,youtube_term,email,subaccount)
        this.setState({isToEdit:false})
    }

    handleReset=()=>{
        this.setState({isToEdit:false})
        
    }

    render(){
        const {place_name,description,image,contact,ig_acct,youtube_term,email,subaccount,isToEdit,place_hooks,hooks,place_id}=this.state

        return(
                <div>
                {isToEdit ?
                    <div>
                    <div className="form-group">
                        <input type="text" name="place_name" placeholder="enter the offer name" value={place_name} className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <textarea cols="6" rows="5" name="description" placeholder="describe the offer" value={description} className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="contact" placeholder="enter phone number (whatsApp)" value={contact} className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="ig_acct" placeholder="enter IG id" value={ig_acct} className="form-control" onChange={this.onChange} />
                    </div>
                        <div className="form-group">
                            <input type="text" name="youtube_term" placeholder="enter youtube term" value={youtube_term} className="form-control" onChange={this.onChange} />
                        </div>
                    <div className="form-group">
                            <input type="file" id="myFile" className="form-control" name="image" onChange={this.handleImageChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="subaccount" placeholder="enter subaccount number" value={subaccount} className="form-control" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" name="image" placeholder="enter image url" className="form-control" value={image} onChange={this.onChange} />
                    </div>
                    <p className="bg-dark text-white">What hooks relate to this offer?</p>
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
                    </div>:

                   
                    <div className="card bg-dark" id="space-card">
                        <span className="text-right text-sm text-display"><i className="fa fa-remove mx-2 text-red" id="delete_place" onClick={this.onDeletePlace}></i><i className="fa fa-edit mx-2 text-white" onClick={this.togglePlaceEdit}></i></span>
                            <img src={image} className=" card-img-top img-responsive img-fluid" />
                        <div className="card-body">
                            <h3 className="card-title text-white">{place_name}</h3>
                            <p className="card-text text-white">{description}</p>
                            <p className="card-text text-white">{contact}</p>
                            <p className="card-text text-white">{ig_acct}</p>
                            <p className="card-text text-white">{youtube_term}</p>
                            <p className="card-text text-white">{email}</p>
                            {/* <p className="card-text text-white">{subaccount}</p> */}
                            <p className="card-text text-white">tracking code-{place_id}</p>

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