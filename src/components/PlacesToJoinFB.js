import React from 'react'
import {withFirebase, FirebaseContext} from '../firebase'
import { AuthUserContext } from '../session';
import moment from 'moment';



const INITIALS = {
    places: [],
    hooks: [],
    joinPlaces:[],
    allJoined:[],
    number_joined:null,
    loading_hooks: false,
    loading_places: false,
    join_ref:null,
    isToJoin:false,
    isToUnjoin:null,
    places_joined_count:0,
    authUserId:null,
    authError:null,
    join_token:null,
    search_text:'',
    user_id:'',
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
                    this.setState({ joinPlaces: joinList,user_id:authUser.uid })
                    console.log(this.state.joinPlaces)
                }
            })
        
            //get all the joinPlaces so that we can get the count for each place in that joinPlaces
            this.props.firebase.joinPlaces().on("value",snapShotAllJoin=>{
                const allJoinedObject=snapShotAllJoin.val()
                if(allJoinedObject){
                    const allJoinedArr=Object.keys(allJoinedObject).map(key=>({
                        ...allJoinedObject,uid:key
                    }))
                    
                    this.setState({allJoined:allJoinedArr})
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

     onUnJoinPlace=(uid,authUser)=>{
         //check if the user have already made transaction in this place, if so...cannot unjoin else go on with unjoin
         this.props.firebase.funSlots().on("value",snapShotFun=>{
             const allFunSlotsObj=snapShotFun.val();
             const allFunSlotArr=Object.keys(allFunSlotsObj).map(key=>({
                 ...allFunSlotsObj,uid:key
             }))
             const have_user_made_transaction=allFunSlotArr.filter(fun=>fun.user_id===authUser.uid)
             if(have_user_made_transaction.length>0){
                 //this means the user have gotten a funslot one time or more by joining here before, hence he is not allowed to delete here
                 this.setState({isToUnjoin:true})
             }
             else{
                 this.props.firebase.joinPlace(uid).remove()
                 var joinPlaceUpdate = this.state.joinPlaces.filter((joinPlace => joinPlace.uid !== uid))

                 this.setState({ join_ref: null, isToJoin: true, joinPlaces: joinPlaceUpdate })
                 this.setState({isToUnjoin:false})
             }
         })
        }

         setSearchText=event=>{
             let search_term=event.target.value;
            this.setState({ search_text: search_term });
             this.props.firebase.places().orderByChild('place_name').startAt(this.state.search_text).limitToFirst(1).on('value',searchResult=>{
                 const placesObj=searchResult.val();
                 const notEmptyResult = !!placesObj && search_term !== ""
                 if(notEmptyResult){
                     const placesArr=Object.keys(placesObj).map(key=>({
                         ...placesObj[key],uid:key
                     }))
                     this.setState({places:placesArr})
                    }
                 else {
                     this.props.firebase.places().on("value", refreshList => {
                         const placeObjectRefresh = refreshList.val()
                         const placeListRefresh = Object.keys(placeObjectRefresh).map(key => ({
                             ...placeObjectRefresh[key], uid: key
                         }))
                         this.setState({ places: placeListRefresh })
                     })

                 }
                    })

             event.preventDefault();
         }

    render(){
        const {loading_places,places,hooks,join_ref,joinPlaces,isToJoin,join_token,allJoined,isToUnjoin,search_text} = this.state

        return(
            <div id="places_to_join">
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <div className="form-group">
                        <input type="text" placeholder="search offer" onChange={this.setSearchText} value={search_text} className="form-control" />
                        </div>
                    </div>
                    <div className="col-lg-12 sm-12">
                    {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                    {places.length>0 ? <Places places={places} allJoined={allJoined} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={this.onJoinPlace} onUnJoinPlace={this.onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} isToUnjoin={isToUnjoin} join_token={join_token}/>
                    :
                    <h3 className="text-display display-4 text-center text-dark">No Offer created by other businesses, Be the first to Create promotional Offer for your businesses and get customers</h3> }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const Places = ({ places, hooks, joinPlaces, onJoinPlace, onUnJoinPlace, join_ref,isToJoin,isToUnJoin,join_token,allJoined }) => (
    <div>
        {places.map(place => (
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} allJoined={allJoined} joinPlaces={joinPlaces} onJoinPlace={onJoinPlace} onUnJoinPlace={onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} isToUnjoin={isToUnJoin} join_token={join_token}/>
        ))}
    </div>
)

class PlaceTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isJoined: false, place_name: this.props.place.place_name, description: this.props.place.description, image: this.props.place.image, contact: this.props.place.contact, hooks: this.props.hooks, joinPlaces:this.props.joinPlaces,place_hooks: this.props.place.place_hooks?this.props.place.place_hooks:[], place_id: this.props.place_id, isToJoin:this.props.isToJoin,join_ref:this.props.join_ref}

    }




    render() {
        const { place_name, description, image, contact,place_id} = this.state

        return (
            <AuthUserContext>
            {authUser=>(
                <div>
                    <div className="card bg-dark">
                    
                        {this.props.isToUnJoin && <p className="text-danger text-center">sorry you cannot unjoin an offer you have already made transaction on</p>}
                        <div className="card-body">
                                <h3 className="card-title text-white">{place_name}</h3>
                                <img src={image} className="card-img img-responsive img-fluid" />
                            <p className="card-text text-white">{description}</p>
                            <p className="card-text text-white">{contact}</p>
                            {/* <div className="form-check-inline">
                                {this.props.loading_hooks && <p className="text-center bg-dark text-white">loading hooks...</p>}
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1 text-white" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" checked={place_hooks.includes(hook.uid) ? true : false} /></span>)}
                            </div> */}
                        </div>
                    </div>

                        <div className="form-group mt-2">
                                    {(()=>{
                                        var count_users=0
                                            var is_present=this.props.allJoined.filter(all_join=>all_join.place_id===this.props.place_id);
                                            if(is_present){
                                                count_users+=1;
                                            }
                                        //checking if the current place has been joined by the current user
                                        if(this.props.joinPlaces){
                                            var array_status=[]  //array that keeps wether this current place has already been joined by the current user joinPlaces
                                        for(let i=0;i<this.props.joinPlaces.length;i++){
                                            array_status.push(this.props.place_id===this.props.joinPlaces[i].place_id)
                                            if(this.props.place_id===this.props.joinPlaces[i].place_id){

                                                var joinedPlaceID=this.props.joinPlaces[i].uid
                                                var token =this.props.joinPlaces[i].token
                                            }
                                        }
                                        if(array_status.some(t=>t===true)){
                                            return(
                                            <div>
                                            <button className="form-control btn-danger text-dark" onClick={() => this.props.onUnJoinPlace(joinedPlaceID,authUser)}>{count_users} joined <span>Unjoin</span> </button>
                                            <p className="text-display text-white bg-dark"> [reward token- {token}]</p></div> )
                                        }
                                        if(array_status.every(t=>t===false)){
                                            return(
                                                <button className="form-control btn-success text-dark" onClick={() => this.props.onJoinPlace(place_id, place_name, authUser)}>{count_users} joined <span>Join this offer</span></button>)
                                        }
                                        }else{
                                            return(
                                                <button className="form-control btn-success text-dark" onClick={() => this.props.onJoinPlace(place_id, place_name, authUser)}>{count_users}joined <span>Join this offer</span></button>)
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