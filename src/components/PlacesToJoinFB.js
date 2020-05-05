import React from 'react'
import {withFirebase} from '../firebase'
import { AuthUserContext } from '../session';
import moment from 'moment';
import PaystackButton from 'react-paystack';
import InstragramGallery from './InstragramGallery';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail'
import YTSearch from 'youtube-api-search';
import { Icon, notification } from 'antd';
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY;


const THUMBNAIL_WIDTH=640;
const PHOTO_COUNT=60;


const INITIALS = {
    pkey: "pk_test_c6ee2e7a44ffb088bff0cd3cfe7665336b40b6c0", //PAYSTACK PUBLIC KEY
    email: "",  // customer email
    amount: 10000,
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
    username:'',
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
                    this.setState({ joinPlaces: joinList,user_id:authUser.uid,username:authUser.username,email:authUser.email })
                }
            })
        
            //get all the joinPlaces so that we can get the count for each place in that joinPlaces
            this.props.firebase.joinPlaces().on("value",snapShotAllJoin=>{
                const allJoinedObject=snapShotAllJoin.val()
                if(allJoinedObject){
                    const allJoinedArr=Object.keys(allJoinedObject).map(key=>({
                        ...allJoinedObject[key],uid:key
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
            date_joined:this.props.firebase.getCurrentTime(),
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
        const {loading_places,places,hooks,join_ref,joinPlaces,isToJoin,join_token,allJoined,isToUnjoin,search_text,email,pkey,username} = this.state

        return(
            <div>
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <div className="form-group">
                        <input type="text" placeholder="search offer" onChange={this.setSearchText} value={search_text} className="form-control" />
                        </div>
                    </div>
                    <div className="col-lg-12 sm-12">
                    {loading_places && <p className="text-center bg-dark text-white">loading...</p>}
                    {places.length>0 ? <Places places={places} allJoined={allJoined} hooks={hooks} joinPlaces={joinPlaces} onJoinPlace={this.onJoinPlace} onUnJoinPlace={this.onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} isToUnjoin={isToUnjoin} join_token={join_token} email={email} pkey={pkey} username={username}/>
                    :
                    <h3 className="text-display display-4 text-center text-dark">No Offer created by other businesses, Be the first to Create promotional Offer for your businesses and get customers</h3> }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const Places = ({ places, hooks, joinPlaces, onJoinPlace, onUnJoinPlace, join_ref,isToJoin,isToUnJoin,join_token,allJoined,email,pkey,username }) => (
    <div>
        {places.map(place => (
            <PlaceTemplate key={place.uid} place_id={place.uid} place={place} hooks={hooks} allJoined={allJoined} joinPlaces={joinPlaces} onJoinPlace={onJoinPlace} onUnJoinPlace={onUnJoinPlace} join_ref={join_ref} isToJoin={isToJoin} isToUnjoin={isToUnJoin} join_token={join_token} email={email} pkey={pkey} username={username}/>
        ))}
    </div>
)

class PlaceTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allJoined: this.props.allJoined, subaccount: this.props.place.subaccount, display_name: '', view_more_images: false, make_payment: false, nego_amount: 0, main_nego_amount: 0, charge_amount: 7000, payment_reference: '', isJoined: false, ig_acct: this.props.place.ig_acct, place_name: this.props.place.place_name, description: this.props.place.description, image: this.props.place.image, contact: this.props.place.contact, hooks: this.props.hooks, joinPlaces: this.props.joinPlaces, place_hooks: this.props.place.place_hooks ? this.props.place.place_hooks : [], place_id: this.props.place_id, isToJoin: this.props.isToJoin, join_ref: this.props.join_ref,videos: [],
            selectedVideo: {}, view_youtube:false, video_term:this.props.place.youtube_term}

    }

    componentDidMount(){
        const display_name={
            username:this.props.username,
            offer:this.props.place.place_name
        }
        this.setState({display_name:display_name})
    }

    setViewYoutube=()=>{
        const view_youtube=this.state.view_youtube;
        const video_term=this.state.video_term;

        if(view_youtube){
            this.setState({view_youtube:false})
        }
        else{
        this.setState({view_youtube:true})
        YTSearch({ key: API_KEY, term:video_term }, (data) => {
                try {
                    if (data && data.data && data.data.error.message) {
                        console.log(data);
                        throw ('error')
                    }
                    this.setState({ videos: data, selectedVideo: data[0] });
                    console.log(this.state.videos);
                } catch (err) {
                    notification['error']({
                        message: "Daily Limit Exceeded",
                        description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                    })
                }

            });
        }
    }

    setNegotiationPay=event=>{
        var nego_amount=event.target.value;
        const main_nego_amount=nego_amount*100
        this.setState({nego_amount:nego_amount,main_nego_amount:main_nego_amount})
    }

    readyPayment=()=>{
        const { make_payment } = this.state
        if (make_payment) {
            this.setState({ make_payment: false,nego_amount:0 })
        }
        else {
            this.setState({ make_payment: true })
        }

    }

    callback = (response) => {
        this.setState({ payment_reference: response.trans })
        console.log(response); // card charged successfully, get reference here
    }

    close = () => {
        this.setState({make_payment:false})
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    setViewGallery=()=>{
        const view_insta_pics=this.state.view_more_images;
        if(view_insta_pics){
            this.setState({view_more_images:false})
        }
        else{
        this.setState({view_more_images:true})
        }
    }

    render() {
        const { ig_acct,place_name,view_more_images, description, display_name, image, contact,place_id,nego_amount,make_payment,payment_reference,main_nego_amount,subaccount,selectedVideo,videos,view_youtube} = this.state
        var count_users = 0
        var is_present = this.props.allJoined.filter(all_join => all_join.place_id === this.props.place_id);
        if (is_present) {
            count_users = is_present.length;
        }
        return (
          <AuthUserContext>
            {authUser => (
              <div className="offer-display">
                <div className="card bg-dark">
                  <span className="text-right text-sm text-display">
                    <i
                      className="fa fa-youtube-play mx-2 text-white"
                      id="view_youtube"
                      onClick={this.setViewYoutube}
                    ></i>
                    &nbsp;
                    <i
                      className="fa fa-instagram mx-2 text-white"
                      id="view_gallery"
                      onClick={this.setViewGallery}
                    ></i>
                  </span>

                  {this.props.isToUnJoin && (
                    <p className="text-danger text-center">
                      sorry you cannot unjoin an offer you have already made
                      transaction on
                    </p>
                  )}

                  <div className="card-body">
                    {view_more_images && ig_acct ? (
                      <InstragramGallery
                        userId={ig_acct}
                        thumbnailWidth={THUMBNAIL_WIDTH}
                        photoCount={PHOTO_COUNT}
                      />
                    ) : view_youtube && videos ? (
                      <div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div style={{ display: "flex" }}>
                            <VideoDetail video={selectedVideo} />
                            <VideoList
                              videos={videos}
                              onVideoSelect={userSelected => {
                                this.setState({
                                  selectedVideo: videos[userSelected]
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className="card-title text-white">{place_name}</h3>
                        <img
                          src={image}
                          className="card-img img-responsive img-fluid"
                          loading="lazy"
                          style={{ width: "100%",height: "auto"}}
                        />
                        <p className="card-text text-white">{description}</p>
                        <p className="card-text text-white">{contact}</p>
                      </div>
                    )}

                    {/* <div className="form-check-inline">
                                {this.props.loading_hooks && <p className="text-center bg-dark text-white">loading hooks...</p>}
                                {hooks.map((hook) =>
                                    <span className="mx-2"><label className="mx-1 text-white" for={hook.hook_name}>{hook.hook_name}</label><input className="form-check-input" name={hook.hook_name} type="checkbox" checked={place_hooks.includes(hook.uid) ? true : false} /></span>)}
                            </div> */}
                  </div>
                  <span className="text-left text-sm text-display text-white mx-1">
                    <i className="fa fa-user-circle-o text-white"></i>&nbsp;
                    {count_users}
                  </span>
                </div>

                <div className="form-group mt-2">
                  {(() => {
                    //checking if the current place has been joined by the current user
                    if (this.props.joinPlaces) {
                      var array_status = []; //array that keeps wether this current place has already been joined by the current user joinPlaces
                      for (let i = 0; i < this.props.joinPlaces.length; i++) {
                        array_status.push(
                          this.props.place_id ===
                            this.props.joinPlaces[i].place_id
                        );
                        if (
                          this.props.place_id ===
                          this.props.joinPlaces[i].place_id
                        ) {
                          var joinedPlaceID = this.props.joinPlaces[i].uid;
                          var token = this.props.joinPlaces[i].token;
                        }
                      }
                      if (array_status.some(t => t === true)) {
                        return (
                          <div className="offer_payment">
                            <button
                              className="form-control btn btn-danger text-dark"
                              onClick={() =>
                                this.props.onUnJoinPlace(
                                  joinedPlaceID,
                                  authUser
                                )
                              }
                            >
                              <span>Unjoin Offer</span>{" "}
                            </button>

                            <p className="text-display text-white bg-dark text-center">
                              {" "}
                              [reward token- {token}]
                            </p>
                            {/* <div className="form-check-inline">
                              <span className="mx-2 text-green">
                                <label
                                  className="mx-1 text-red"
                                  for="ready_for_payment"
                                >
                                  <i className="fa fa-credit-card"></i>
                                  &nbsp;make payment
                                </label>
                                <input
                                  className="form-check-input"
                                  name="make_payment"
                                  value={make_payment}
                                  type="checkbox"
                                  checked={make_payment}
                                  onChange={this.readyPayment}
                                />
                              </span>
                            </div> */}
                            {make_payment && (
                              <div className="paystack_window">
                                <div className="form-group mt-1">
                                  <input
                                    className="form-control"
                                    placeholder="Enter the amount negotiated"
                                    type="number"
                                    value={nego_amount}
                                    onChange={this.setNegotiationPay}
                                  />
                                </div>
                                {/* <div>
                                  <p>
                                    <PaystackButton
                                      text="Make Payment"
                                      class="payButton"
                                      callback={this.callback}
                                      close={this.close}
                                      disabled={true}
                                      embed={true}
                                      reference={this.getReference()}
                                      email={this.props.email}
                                      amount={main_nego_amount}
                                      paystackkey={this.props.pkey}
                                      tag="button"
                                      subaccount={subaccount}
                                      bearer="subaccount"
                                      metadata={display_name}
                                    />
                                  </p>
                                </div> */}
                                {payment_reference && (
                                  <p className="text-display text-white bg-dark">
                                    [send payment code- {payment_reference} for
                                    verification
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      if (array_status.every(t => t === false)) {
                        return (
                          <button
                            className="form-control btn btn-success text-dark"
                            onClick={() =>
                              this.props.onJoinPlace(
                                place_id,
                                place_name,
                                authUser
                              )
                            }
                          >
                            <span>Join Offer</span>
                          </button>
                        );
                      }
                    } else {
                      return (
                        <button
                          className="form-control btn btn-success text-dark"
                          onClick={() =>
                            this.props.onJoinPlace(
                              place_id,
                              place_name,
                              authUser
                            )
                          }
                        >
                          <span>Join Offer</span>
                        </button>
                      );
                    }
                  })()}
                </div>
              </div>
            )}
          </AuthUserContext>
        );
    }
}

export default withFirebase(PlacesToJoinFB)