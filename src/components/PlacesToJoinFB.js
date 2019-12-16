import React from 'react'
import {withFirebase} from '../firebase'
import { AuthUserContext } from '../session';



const INITIALS = {
    places: [],
    hooks: [],
    joinPlaces:[],
    loading_hooks: false,
    loading_places: false,
    join_ref:null,
    isToJoin:false,
    places_joined_count:0,
}
class PlacesToJoinFB extends React.Component {
    constructor(props){
        super(props);
        this.state={...INITIALS}

    }

    componentDidMount(){
        this.setState({loading_hooks:true,loading_places:true})
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

        this.props.firebase.joinPlaces().on("value", joinSnapShot => {
            const joinObject = joinSnapShot.val()
            if(joinObject){
            const joinList = Object.keys(joinObject).map(key => ({
                ...joinObject[key], uid: key
            }))
            

            this.setState({ joinPlaces: joinList })
            console.log(this.state.joinPlaces)
        }
        })
        this.setState({loading_hooks:false,loading_places:false})
    }

    onJoinPlace=(place_id,authUser)=>{
        var joinRef=this.props.firebase.joinPlaces().push({
            place_id,
            userId:authUser.uid,
        })
        this.setState({join_ref:joinRef.key,isToJoin:false})
    }

     onUnJoinPlace=uid=>{
        this.props.firebase.joinPlace(uid).remove()
        var joinPlaceUpdate=this.state.joinPlaces.filter((joinPlace=>joinPlace.uid!==uid))

        this.setState({join_ref:null,isToJoin:true,joinPlaces:joinPlaceUpdate})
    }

    render(){
        const {loading_places,places,hooks,join_ref,joinPlaces,isToJoin} = this.state

        return(
            <div className="container mt-3">
                <div className="row">
                    {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                    <Places places={places} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={this.onJoinPlace} onUnJoinPlace={this.onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin}/>
                </div>
            </div>
        )
    }
}

const Places = ({ places, hooks, joinPlaces, onJoinPlace, onUnJoinPlace, join_ref,isToJoin }) => (
    <div>
        {places.map(place => (
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={onJoinPlace} onUnJoinPlace={onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} />
        ))}
    </div>
)

class PlaceTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isJoined: false, place_name: this.props.place.place_name, description: this.props.place.description, image: this.props.place.image, contact: this.props.place.contact, hooks: this.props.hooks, joinPlaces:this.props.joinPlaces,place_hooks: this.props.place.place_hooks, place_id: this.props.place_id, isToJoin:this.props.isToJoin,join_ref:this.props.join_ref}

    }




    render() {
        const { place_name, description, image, contact,place_hooks, hooks,joinPlaces,place_id,isToJoin,join_ref } = this.state
        console.log(this.props.joinPlaces)
        console.log(place_id)
        console.log(this.props.place_id)
        console.log(this.props.joinPlaces.length)
        console.log(this.props.join_ref)

        return (
            <AuthUserContext>
            {authUser=>(
            <div className="col-lg-12 sm-12" id="places_to_join">
                    <div className="card bg-dark">
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

                        <div className="form-group mt-2">
                                    {this.props.joinPlaces && this.props.joinPlaces.map((joinPlace) => joinPlace.userId === authUser.uid && (this.props.join_ref || joinPlace.place_id === this.props.place_id) && <button className="form-control btn-success text-white" onClick={() => this.props.onUnJoinPlace(joinPlace.uid)}>UnJoin</button>)}
                                    {this.props.joinPlaces && this.props.joinPlaces.map((joinPlace) => joinPlace.userId === authUser.uid && (joinPlace.place_id!==this.props.place_id) && <button className="form-control btn-success text-white" onClick={() => this.props.onJoinPlace(place_id,authUser)}>Join</button>)}
                                    {this.props.joinPlaces.length <= 0 && <button className="form-control btn-success text-white" onClick={() => this.props.onJoinPlace(place_id, authUser)}>Join</button>}
                                    {/* {this.props.joinPlaces.length <= 0 && <button className="form-control btn-success text-white" onClick={() => this.props.onJoinPlace(place_id, authUser)}>Join</button>}
                                    {this.props.join_ref===null && <button className="form-control btn-success text-white" onClick={() => this.props.onJoinPlace(place_id, authUser)}>Join</button>} */}
                                    
                            
                        </div>
                        </div>
                    </div>
            </div>
            )}
            </AuthUserContext>
        )
    }
}

export default withFirebase(PlacesToJoinFB)