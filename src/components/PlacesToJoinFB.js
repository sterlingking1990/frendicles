import React from 'react'
import {withFirebase} from '../firebase'
import { AuthUserContext } from '../session';
import moment from 'moment';



const INITIALS = {
    places: [],
    hooks: [],
    joinPlaces:[],
    loading_hooks: false,
    loading_places: false,
    join_ref:null,
    isToJoin:false,
    places_joined_count:0,
    authUserId:null,
    authError:null,
    join_token:null,
}

class PlacesToJoinFB extends React.Component {
    constructor(props){
        super(props);
        this.state={...INITIALS}

    }

    componentDidMount(){
        this.setState({ loading_hooks: true, loading_places: true })
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.joinPlaces().orderByChild("userId").equalTo(authUser.uid).on("value", joinResult => {
                const joinObject = joinResult.val()
                if (joinObject) {
                    const joinList = Object.keys(joinObject).map(key => ({
                        ...joinObject[key], uid: key
                    }))
                    this.setState({ joinPlaces: joinList })
                    console.log(this.state.joinPlaces)
                }
            })

            this.props.firebase.places().on("value", placeSnapShot => {
                const placeObject = placeSnapShot.val()
                const placeList = Object.keys(placeObject).map(key => ({
                    ...placeObject[key], uid: key
                }))
                const places_to_join = placeList.filter(place => place.userId !==authUser.uid)
                this.setState({ places: places_to_join })
            })
                
        });
        

        this.props.firebase.hooks().once("value",snapShot=>{
            const hookObject=snapShot.val()
            const hookList=Object.keys(hookObject).map(key=>({
                ...hookObject[key],uid:key
            }))
            this.setState({hooks:hookList})
        })

        this.setState({loading_hooks:false,loading_places:false})
    }

    onJoinPlace=(place_id,place_name,authUser)=>{
        var place_name_join=place_name.replace(/\s/g,'');

        var joinRef=this.props.firebase.joinPlaces().push({
            token:place_name_join + moment().dayOfYear() + '-' + moment().second() + '-' + moment().hour() + '-' + moment().minute() + '-' + (this.state.joinPlaces.length ? this.state.joinPlaces.length : 0),
            place_id,
            userId:authUser.uid,
        })

        this.setState({join_ref:joinRef.key,isToJoin:false})
        this.props.firebase.joinPlaces().orderByChild('key').equalTo(this.state.join_ref).on('value',snapShot=>{
            const snapShotObj=snapShot.val()
            if(snapShotObj){
            const snapShotArray=Object.keys(snapShotObj).map(each=>({
                ...snapShotObj[each],uid:each
            }))
            this.setState({join_token:snapShotArray[0].token})
        }
        else{
            this.setState({join_token:null})
        }
        })
        
    }

     onUnJoinPlace=uid=>{
         //check if the user have already made transaction in this place, if so...cannot unjoin else go on with unjoin
         
        this.props.firebase.joinPlace(uid).remove()
        var joinPlaceUpdate=this.state.joinPlaces.filter((joinPlace=>joinPlace.uid!==uid))

        this.setState({join_ref:null,isToJoin:true,joinPlaces:joinPlaceUpdate})
    }

    render(){
        const {loading_places,places,hooks,join_ref,joinPlaces,isToJoin,join_token} = this.state

        return(
            <div id="places_to_join">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                    {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                    {places.length>0 ? <Places places={places} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={this.onJoinPlace} onUnJoinPlace={this.onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} join_token={join_token}/> 
                    :
                    <h3 className="text-display display-4 text-center text-dark">No Offer created by other businesses, Be the first to Create promotional Offer for your businesses and get customers</h3> }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const Places = ({ places, hooks, joinPlaces, onJoinPlace, onUnJoinPlace, join_ref,isToJoin,join_token }) => (
    <div>
        {places.map(place => (
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={onJoinPlace} onUnJoinPlace={onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} join_token={join_token}/>
        ))}
    </div>
)

class PlaceTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isJoined: false, place_name: this.props.place.place_name, description: this.props.place.description, image: this.props.place.image, contact: this.props.place.contact, hooks: this.props.hooks, joinPlaces:this.props.joinPlaces,place_hooks: this.props.place.place_hooks, place_id: this.props.place_id, isToJoin:this.props.isToJoin,join_ref:this.props.join_ref}

    }




    render() {
        const { place_name, description, image, contact,place_hooks, hooks,place_id} = this.state
        console.log(this.props.join_token)

        return (
            <AuthUserContext>
            {authUser=>(
                <div>
                    <div className="card bg-dark">
                        
                        <div className="card-body">
                                <h3 className="card-title text-white">{place_name}</h3>
                                <img src={image} className="card-img img-responsive img-fluid" />
                            <p className="card-text text-white">{description}</p>
                            <p className="card-text text-white">{contact}</p>
                            <div className="form-check-inline">
                                {this.props.loading_hooks && <p className="text-center bg-dark text-white">loading hooks...</p>}
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1 text-white" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" checked={place_hooks.includes(hook.uid) ? true : false} /></span>)}
                            </div>
                        </div>
                    </div>

                        <div className="form-group mt-2">
                                    {(()=>{
                                        if(this.props.joinPlaces){
                                            var array_status=[]
                                        for(let i=0;i<this.props.joinPlaces.length;i++){
                                            array_status.push(this.props.place_id===this.props.joinPlaces[i].place_id)
                                            if(this.props.place_id===this.props.joinPlaces[i].place_id){
                                                var joinedPlaceID=this.props.joinPlaces[i].uid
                                                var token =this.props.joinPlaces[i].token
                                            }
                                        }
                                        if(array_status.some(t=>t===true)){
                                            return(
                                                
                                            <button className="form-control btn-danger text-dark" onClick={() => this.props.onUnJoinPlace(joinedPlaceID)}>UnJoin offer [funbie token- {token}]</button>)
                                        }
                                        if(array_status.every(t=>t===false)){
                                            return(
                                            <button className="form-control btn-success text-dark" onClick={() => this.props.onJoinPlace(place_id, place_name, authUser)}>Join this offer</button>)
                                        }
                                        }else{
                                            return(
                                            <button className="form-control btn-success text-dark" onClick={() => this.props.onJoinPlace(place_id, place_name, authUser)}>Join this offer</button>)
                                        }
                                    })()}

                            </div>
                        </div>
            )}
            </AuthUserContext>
        )
    }
}

export default withFirebase(PlacesToJoinFB)