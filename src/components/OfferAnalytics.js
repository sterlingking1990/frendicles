import React from 'react'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import {withFirebase} from '../firebase'
import { setTimeout } from 'timers';


class OfferAnalytics extends React.Component{
    constructor(props){
        super(props);

        this.state={offer_id:'',no_join:false,users:[],places:[],isLoading:true,startDate:moment().startOf('month'),endDate:moment().startOf('month'),calendarFocused:null,userJoin:[]}
    }


    componentDidMount() {
        
        this.props.firebase.users().on('value', snapShot => {
            const userObj = snapShot.val()
            const userArr = Object.keys(userObj).map(key => ({
                ...userObj[key], uid: key
            }))
            this.setState({ users: userArr })

        })

        this.props.firebase.places().on('value', snapShot => {
            const placeObj = snapShot.val()
            const placeArr = Object.keys(placeObj).map(key => ({
                ...placeObj[key], uid: key
            }))
                this.setState({ places: placeArr})

            })
    }

        onDatesChange=({startDate,endDate})=>{

            this.setState({startDate:startDate,endDate:endDate})


            setTimeout(function(){
                this.processDate();
                this.setState({isLoading:false})
            }.bind(this), 2000);
        }

        setOfferID=event=>{
            this.setState({offer_id:event.target.value})
        }

        

    processDate=()=>{
        const {startDate,endDate,offer_id}=this.state
        const newStartDate=Date.parse(startDate.toDate());
        const newEndDate=Date.parse(endDate.toDate());
        console.log(newStartDate,newEndDate)
        this.props.firebase.joinPlaces().orderByChild('date_joined').startAt(newStartDate).endAt(newEndDate).on('value', snapShot => {
            const joinObject = snapShot.val()
            if (joinObject) {
                const joinList = Object.keys(joinObject).map(key => ({
                    ...joinObject[key], uid: key
                }))
                //get only the users that join current users offer
                const users_who_joined_offer=joinList.filter(join=>join.place_id===offer_id)
                if(users_who_joined_offer.length>0){
                    this.setState({ userJoin: users_who_joined_offer })
                }
                else{
                    this.setState({no_join:true})
                }
                
            }
        })

    }

        onFocusChange=(calendarFocused)=>{
            this.setState(()=>({calendarFocused}))
        }


    render(){
        const {startDate,endDate,calendarFocused,userJoin,users,places,offer_id,isLoading,no_join}=this.state
        return(
            <div>
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>

                    </div>
                </div>
                    <div className="container-fluid mt-3">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="well well-bg bg-white text-center">Enter Offer ID, Then Select Range to View the Analytics for this Offer ID</div>
                            </div>
                            <div className="col-lg-12">
                            <br />
                                <div className="form-group">
                                    <input type="text" className="form-control" value={offer_id} placeholder="enter offer id" onChange={this.setOfferID} />
                                </div>
                            </div>
                        <div className="col-lg-12">
                            <div className="card bg-dark">
                                <h4 className="card-title text-center text-white">Select Date Range to view customers who showed interest on your offer</h4>
                                <div className="card-body text-center">
                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        onDatesChange={this.onDatesChange}
                                        focusedInput={calendarFocused}
                                        onFocusChange={this.onFocusChange}
                                        numberOfMonths={1}
                                        isOutsideRange={() => false}
                                        showClearDates={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <br/>
                            <div className="well well-bg bg-white text-center">Your Analytics Information</div>
                            <br />
                            {no_join && <p className="text-display text-center bg-dark text-white">Either no one has joined your offer for the date range selected or your offer ID is incorrect, contact Your Business Manager for help</p>}
                            {isLoading ? <p className="text-display text-center bg-dark text-white">loading...</p> : <p className="text-display text-center bg-dark text-white">Number of Customers who Joined your Offer {userJoin.length}</p>}
                        </div>
                    </div>
                      <div className="row" id="ofatri-analysis-header">
                                <div className="col">
                                    Name
                                </div>
                                <div className="col">
                                    Offer
            
                                </div>
                                <div className="col">
                                    Token
                                </div>
                        </div>
                    <br />
                    <UserDetails userJoin={userJoin} users={users} places={places} />
                </div>                
            </div>
        )}
    }

const UserDetails=({userJoin,users,places})=>(
    <div>
        {userJoin.map(user=>(<UserTemplate key={user.uid} user_detail={user} users={users} places={places}/>))}
    </div>
)

class UserTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={users:this.props.users,places:this.props.places,user_name:'',place_name:'',user_id:this.props.user_detail.userId,place_id:this.props.user_detail.place_id,token:this.props.user_detail.token}
    }


    render(){
        const {token,users,places,user_id,place_id}=this.state
        
        const username=users.filter(user=>user.uid===user_id)
        
        const place_name=places.filter(place=>place.uid===place_id)
        
        return(
            <div className="row" id="analysis-row">
            <div className="col">
            {username[0]?users[0].username:'anonymous'}
            </div>
            <div className="col">
            {place_name[0].place_name}
            </div>
            <div className="col">
            {token}
            </div>
            <br/>
            </div>
        )
    }
}


export default withFirebase(OfferAnalytics)