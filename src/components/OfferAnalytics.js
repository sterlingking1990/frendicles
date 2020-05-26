import React from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import NumberFormat from "react-number-format";
import moment from "moment";
import { withFirebase } from "../firebase";
import { setTimeout } from "timers";


class OfferAnalytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offer_id: "",
      no_join: false,
      users: [],
      places: [],
      isLoading:false,
      startDate: moment().startOf("month"),
      endDate: moment().startOf("month"),
      calendarFocused: null,
      userJoin: [],
      reward_amount: 0,
      transaction_completed: false,
      all_user_goal_settings: [],
      fun_details: [],
      total_fun_amount: 0,
      auto_amount: 0,
      auto_reward_arr: [],
      loadingRewards: true,
      closeOffer: false,
      toggleResult: "password",
      eye_toggle: "fa fa-fw fa-eye field-icon",
      total_reward_for_user:0
    };

  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapShot => {
      const userObj = snapShot.val();
      const userArr = Object.keys(userObj).map(key => ({
        ...userObj[key],
        uid: key
      }));
      this.setState({ users: userArr });
    });

    this.props.firebase.places().on("value", snapShot => {
      const placeObj = snapShot.val();
      const placeArr = Object.keys(placeObj).map(key => ({
        ...placeObj[key],
        uid: key
      }));
      this.setState({ places: placeArr });
    });

    //get all the reward
    this.props.firebase.goalSettings().on("value", snapShot => {
      const goalObj = snapShot.val();
      const goalArr = Object.keys(goalObj).map(key => ({
        ...goalObj[key],
        uid: key
      }));
      this.setState({ all_user_goal_settings: goalArr });
    });

    //get the total fun amount from funSlot
    this.props.firebase.funSlotUpdates().on("value", snapShot => {
      const funSlotObj = snapShot.val();
      const funSlotArr = Object.keys(funSlotObj).map(key => ({
        ...funSlotObj[key],
        uid: key
      }));
      this.setState({ fun_details: funSlotArr});
      console.log(funSlotArr)
    });
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ isLoading: true });
    this.setState({ startDate: startDate, endDate: endDate });

    setTimeout(
      function() {
        this.processDate();
        this.setState({ isLoading: false,loadingRewards:false });
      }.bind(this),
      2000
    );
  };

  setOfferID = event => {
    this.setState({ offer_id: event.target.value });
  };

  processDate = () => {
    const { startDate, endDate, offer_id } = this.state;
    const newStartDate = Date.parse(startDate.toDate());
    const newEndDate = Date.parse(endDate.toDate());
    console.log(newStartDate, newEndDate);
    this.props.firebase
      .joinPlaces()
      .orderByChild("date_joined")
      .startAt(newStartDate)
      .endAt(newEndDate)
      .on("value", snapShot => {
        const joinObject = snapShot.val();
        if (joinObject) {
          const joinList = Object.keys(joinObject).map(key => ({
            ...joinObject[key],
            uid: key
          }));
          //get only the users that join current users offer
          const users_who_joined_offer = joinList.filter(
            join => join.place_id === offer_id
          );
          console.log(users_who_joined_offer);
          if (users_who_joined_offer.length > 0) {
            this.setState({ userJoin: users_who_joined_offer,no_join:false});
          } else {
            this.setState({ no_join: true,isLoading:false });
          }
        }
      });
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  saveRewardAmount = e => {
    let amount = e.target.value;
    console.log(amount);
    this.setState({ reward_amount: amount });
  };

  rewardUser = (user_id,place_id, token) => {
    //get the record for funslots
    let { reward_amount, users, places } = this.state;



    var arrFunPick=[]
      this.props.firebase.funSlotUpdates().on("value", snapShot => {
        const funSlotObj = snapShot.val();
        const funSlotArr = Object.keys(funSlotObj).map(key => ({
          ...funSlotObj[key],
          uid: key
        }));
      
        for(let i=0;i<funSlotArr.length;i++){
           
          arrFunPick.push(funSlotArr[i][place_id])
        }
      });
      

      //the reward might be for the first time, hence arrFunPick is empty
    
        const placename = places.filter(place => place.uid === place_id);
        const user_for_placename = users.filter(
          user => user.uid === placename[0].userId
        );

        var fun_collections=arrFunPick.filter(each=>each!==undefined)
        console.log(fun_collections)
        //sum the total rewards for all the offers created for the place
        if(fun_collections.length>0){
        let total_amount_rewarded = fun_collections.filter(
          reward =>
            reward.user_id === user_id &&
            token.includes(user_for_placename[0].username)
        );
        

        var total_reward_amount = total_amount_rewarded.reduce(function(acc, curr) {
          return (acc += Number(curr.funbees_won));
        }, 0);

        

        var total_reward=parseInt(reward_amount)+parseInt(total_reward_amount)
    }else{
    total_reward=reward_amount
  }
    

    this.setState({total_fun_amount:total_reward})


    let transaction_owner_splitted = token.split("-")[0];

    let transaction_owner = transaction_owner_splitted.match(/[a-zA-Z]*/)[0];

    this.props.firebase.funSlotUpdate(user_id,place_id).set({
      user_id,
      funbees_won: total_reward,
      transaction_owner: transaction_owner,
      reward_token: token,
      latest_update: this.props.firebase.getCurrentTime()
    });

    this.setState({ transaction_completed: true });

    setTimeout(
      function() {
        this.setState({ transaction_completed: false });
      }.bind(this),
      3000
    );
    // this.props.firebase.sendEmailOnReward(
    //   subject,
    //   user_email,
    //   admin[0].username,
    //   image,
    //   funbees_won
    // );
  };


  redeemUserGoal=(token,cost,user_id,place_id)=>{

    const {users,places}=this.state
    
    var arrFunPickGoal = [];
    this.props.firebase.funSlotUpdates().on("value", snapShot => {
      const funSlotObj = snapShot.val();
      const funSlotArr = Object.keys(funSlotObj).map(key => ({
        ...funSlotObj[key],
        uid: key
      }));
      for (let i = 0; i < funSlotArr.length; i++) {
        arrFunPickGoal.push(funSlotArr[i][place_id]);
      }
    });


    const placename = places.filter(place => place.uid === place_id);
    const user_for_placename = users.filter(
      user => user.uid === placename[0].userId
    );

    var filter_undefined=arrFunPickGoal.filter(each=>each!==undefined)

    if(filter_undefined.length>0){
    let total_amount_rewarded = filter_undefined.filter(
      reward =>
        reward.user_id === user_id && token.includes(user_for_placename[0].username)
    );

    var total_reward_amount = total_amount_rewarded.reduce(function(acc, curr) {
      return (acc += Number(curr.funbees_won));
    }, 0);

    console.log(total_reward_amount)
    let balance=Math.abs(parseInt(total_reward_amount)-parseInt(cost))

     this.setState({ total_fun_amount: balance });


     this.props.firebase.funSlotUpdate(user_id, place_id).update({
       funbees_won: balance,
       latest_update: this.props.firebase.getCurrentTime()
     });

     this.setState({ transaction_completed: true });

     setTimeout(
       function() {
         this.setState({ transaction_completed: false });
       }.bind(this),
       3000
     );

  }





  }

  saveAutoRewardAmount = event => {
    let auto_reward_amount=event.target.value
    this.setState({auto_amount:auto_reward_amount})
  };

  automateReward = () => {
    const { auto_amount, userJoin } = this.state;
    console.log(auto_amount);
    let place_id = userJoin[0].place_id;
    this.props.firebase.funSlotUpdates().on("value", snapShot => {
      const funSlotRewObj = snapShot.val();
      const funSlotRewArr = Object.keys(funSlotRewObj).map(key => ({
        ...funSlotRewObj[key],
        uid: key
      }));
      this.setState({ auto_reward_arr: funSlotRewArr });
    })

      setTimeout(
        function() {
          let reward_arr=this.state.auto_reward_arr
                      for (let i = 0; i < reward_arr.length; i++) {
                        let amount_user_have = reward_arr[i][place_id].funbees_won;
                        let user_id = reward_arr[i][place_id].user_id;
                        let amount_to_reward =
                          parseInt(amount_user_have) + parseInt(auto_amount);
                        console.log(user_id);
                        console.log(amount_to_reward);
                      this.props.firebase
                                .funSlotUpdate(user_id,place_id)
                                .update({
                                  funbees_won: parseInt(amount_to_reward),
                                  latest_update: this.props.firebase.getCurrentTime()
                              })
                            }
                   }.bind(this),
        3000
      );



  };

  closeOffer=()=>{
    const {offer_id,closedOffer}=this.state
    if(closedOffer){
      this.setState({closedOffer:false})
       this.props.firebase.place(offer_id).update({
         status: "open",
         date: this.props.firebase.getCurrentTime()
       });
    }
    else{    
        this.props.firebase.place(offer_id).update({
        status:"closed",
        date_closed: this.props.firebase.getCurrentTime()
      });
      this.setState({closedOffer:true})
    }
  }

  togglePassword = () => {
      const toggle_res = this.state.toggleResult;
      if (toggle_res === "password") {
        this.setState({
          toggleResult: "text",
          eye_toggle: " fa fa-fw fa-eye fa-eye-slash"
        });
      } else {
        this.setState({
          toggleResult: "password",
          eye_toggle: "fa fa-fw fa-eye field-icon"
        });
      }
    };

  

  render() {
    const {
      startDate,
      endDate,
      calendarFocused,
      userJoin,
      users,
      places,
      offer_id,
      isLoading,
      no_join,
      transaction_completed,
      all_user_goal_settings,
      fun_details,
      total_fun_amount,
      closedOffer,
      loadingRewards,
      toggleResult,
      eye_toggle,
    } = this.state;
    return (
      <div>
        <div className="banner-body-background">
          <div className="banner-body-text1">
            <span className="logo-name" id="app-name">
              ofatri
            </span>
            <div className="text-display text-center">
              <strong id="first_heading">Make Transactions </strong> &nbsp;
              <strong id="second_heading"> Get Rewarded</strong>&nbsp;
              <strong id="third_heading"> Achieve Goals</strong>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-12">
              <div className="well well-bg bg-white text-center">
                Enter Offer ID, Then Select Date Range to View Customers who Participated in your Offer
              </div>
            </div>
            <div className="col-lg-12">
              <br />
              <div className="form-group">
                <input
                  type={toggleResult}
                  className="form-control"

                  value={offer_id}
                  placeholder="enter offer id"
                  onChange={this.setOfferID}
                />
                <span className="mt-1 my-1 text-right" onClick={this.togglePassword}><i className={eye_toggle}></i></span>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card bg-dark">
                <h4 className="card-title text-center text-white">
                  Select Date Range to view customers who showed interest on
                  your offer
                </h4>
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
              <br />
              <div className="well well-bg bg-white text-center">
                Your Customers
              </div>
              <br />
              {no_join && (
                <p className="text-display text-center bg-dark text-white">
                  Either no one has joined your offer for the date range
                  selected or your offer ID is incorrect, contact Your Offer
                  Admin for help
                </p>
              )}
              {isLoading ? (
                <small>
                  <div className="spinner-border text-muted text-center mx-5"></div>
                </small>
              ) : (
                <div>
                  <p className="text-display text-center bg-dark text-white">
                    Number of Customers who Joined your Offer- 
                    {loadingRewards ? (
                      <small>
                        <div className="spinner-border text-primary text-small"></div>
                      </small>
                    ) : (
                      userJoin.length
                    )}
                  </p>
                  {userJoin.length>0 &&
                  (<div className="row">
                    <div className="col">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          onChange={this.saveAutoRewardAmount}
                          placeholder="auto reward amt"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        onClick={this.automateReward}
                      >
                        Auto Reward
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className="btn btn-primary"
                        onClick={this.closeOffer}
                      >
                        {closedOffer ? (
                          <span>Open Offer</span>
                        ) : (
                          <span>Close Offer</span>
                        )}
                      </button>
                    </div>
                  </div>)}
                </div>
              )}
            </div>
          </div>
          <div className="row" id="ofatri-analysis-header">
            <div className="col">Name</div>
            <div className="col">Phone</div>
            <div className="col">Token</div>
          </div>
          <br />
          <UserDetails
            userJoin={userJoin}
            users={users}
            places={places}
            saveRewardAmount={this.saveRewardAmount}
            rewardUser={this.rewardUser}
            transaction_completed={transaction_completed}
            all_user_goal_settings={all_user_goal_settings}
            fun_details={fun_details}
            total_fun_amount={total_fun_amount}
            redeemUserGoal={this.redeemUserGoal}
          />
        </div>
      </div>
    );
  }
}

const UserDetails = ({
  userJoin,
  users,
  places,
  saveRewardAmount,
  rewardUser,
  transaction_completed,
  all_user_goal_settings,
  fun_details,
  total_fun_amount,
  redeemUserGoal,
}) => (
  <div id="analysis-row">
    {userJoin.map(user => (
      <UserTemplate
        key={user.uid}
        user_detail={user}
        users={users}
        places={places}
        saveRewardAmount={saveRewardAmount}
        rewardUser={rewardUser}
        transaction_completed={transaction_completed}
        all_user_goal_settings={all_user_goal_settings}
        fun_details={fun_details}
        total_fun_amount={total_fun_amount}
        redeemUserGoal={redeemUserGoal}
      />
    ))}
  </div>
);

class UserTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      places: this.props.places,
      user_name: "",
      place_name: "",
      user_id: this.props.user_detail.userId,
      place_id: this.props.user_detail.place_id,
      token: this.props.user_detail.token,
      is_show_form: false,
      all_user_goal_settings: this.props.all_user_goal_settings,
      fun_details: this.props.fun_details,
      total_fun_amount:this.props.total_fun_amount,
    };

  }

  showRewardForm = () => {
    // let transaction_owner_split = token.split("")[0];
    // let transaction_owner_name = transaction_owner_split.match(/[a-zA-Z]*/);
    // console.log(transaction_owner_name);
    // //get the total of the user_id fun amount
    // let user_fun_details = this.state.fun_details;
    // let all_user_goals = this.state.all_user_goal_settings;
    // console.log(user_fun_details);
    // console.log(all_user_goals);

    this.setState({ is_show_form: true });
  };

  showFormClose = () => {
    this.setState({ is_show_form: false });
  };

  render() {
    const {
      token,
      users,
      user_id,
      place_id,
      places,
      is_show_form,
      fun_details,
      total_fun_amount,
    } = this.state;
    
    
    const username = users.filter(user => user.uid === user_id);
    const placename=places.filter(place=>place.uid===place_id);
   
    const user_for_placename=users.filter(user=>user.uid===placename[0].userId)
    
    let arrFunSlot = [];
    let total_reward_slot=[];

        for (let i = 0; i < this.props.fun_details.length; i++) {
         
          arrFunSlot.push(this.props.fun_details[i][place_id])
          if(this.props.fun_details[i].uid===user_id){
          total_reward_slot.push(this.props.fun_details[i])
          }
        }

        console.log(arrFunSlot)
        console.log(total_reward_slot)


        let keys_slot=[]
        for(let k=0;k<total_reward_slot.length;k++){
          keys_slot.push(Object.keys(total_reward_slot[k]))
        }

        var total_reward_user = 0;
        for (let x = 0; x < keys_slot[0].length - 1; x++) {
          total_reward_user =
            parseInt(total_reward_user) +
            parseInt(total_reward_slot[0][keys_slot[0][x]].funbees_won);
        }

        

     //means the user hasnt been rewarded before by the offer;

        var collection_fun=arrFunSlot.filter(each=>each!==undefined)
        if(collection_fun.length===0){
          var total_reward_amount=0
        }
        else{
          let total_amount_rewarded = collection_fun.filter(
          reward =>
          reward.user_id === username[0].uid &&
               token.includes(user_for_placename[0].username)
          );

          // let total_amount_rewarded_for_token = arrFunSlot.filter(
          //   reward =>
          //     reward.user_id === username[0].uid &&
          //     token.includes(user_for_placename[0].username)
          // );
          console.log(user_for_placename[0].username)
          console.log(total_amount_rewarded)
          console.log(token.includes(user_for_placename[0].username))

    //sum up all reward amount for this current user on the current business 

          // var total_reward_amount_for_token = total_amount_rewarded_for_token.reduce(function(acc, curr) {
          // return (acc += Number(curr.funbees_won));
          // }, 0);

          var total_reward_amount=total_amount_rewarded.reduce(function(acc, curr) {
          return (acc += Number(curr.funbees_won));
          }, 0);

          console.log(total_reward_amount);
        }
      // var total_reward_amount_for_token=this.props.total_fun_amount

    // const place_name=places.filter(place=>place.uid===place_id)

    return (
      <div>
        {is_show_form ? (
          <div>
            <br />
            <div className="row">
              <span className="text-left text-sm text-display">
                <button onClick={this.showFormClose}>
                  <i
                    className="fa fa-close mx-2 text-dark"
                    id="view_gallery"
                  ></i>
                </button>
              </span>
              {(() => {
                if (this.props.transaction_completed) {
                  return (
                    <span className="text-right text-sm text-display mx-2">
                      &nbsp;&nbsp;&nbsp;
                      <i className="fa fa-check-circle text-green"></i>
                    </span>
                  );
                }
              })()}
              <div className="col-sm-6 mt-2">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter amount to reward"
                    onChange={e => this.props.saveRewardAmount(e)}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <button
                  className="btn btn-primary"
                  onClick={() => this.props.rewardUser(username[0].uid,place_id, token)}
                >
                  Reward User
                </button>
              </div>
            </div>
            <br />
            {/* /*list the goals and their ratings for redeeming*/}
            <div>
              {(() => {
                let goal_list=[]
                if (this.props.all_user_goal_settings) {
                  console.log("am here")
                  console.log(this.props.all_user_goal_settings.length)
                  console.log(this.props.all_user_goal_settings)
                  console.log(this.props.all_user_goal_settings[0][0])
                  console.log(this.props.all_user_goal_settings[0][0].length)
                  console.log(this.props.all_user_goal_settings[0])
                  for(let i=0;i<this.props.all_user_goal_settings.length;i++){
                     let goal_obj=Object.values(this.props.all_user_goal_settings[i])
                     for(let j=0;j<goal_obj.length;j++){
                       if(goal_obj[j].goal_owner===user_for_placename[0].username && goal_obj[j].user_id===username[0].uid){
                         goal_list.push({goal_type:goal_obj[j].type,cost:goal_obj[j].cost})
                       }
                     }
                  }
                  return (
                    <span className="text-right text-sm text-display mx-2">
                      &nbsp;&nbsp;&nbsp;
                      <ul className="list-group list-group-horizontal">
                      {goal_list.map(function(current_item){
                        const disabledButton={}
                        var reward_rate_to_goal=parseInt((total_reward_user/current_item.cost)*100);
                        console.log(reward_rate_to_goal)
                        console.log(current_item.cost)
                        console.log(total_reward_user)
                        var color;
                        if(reward_rate_to_goal>=100){
                          reward_rate_to_goal=100
                          color = "mx-1 list-group-item list-group-item-success";
                          disabledButton.disabled=false;
                        }
                        if(reward_rate_to_goal>=50 && reward_rate_to_goal<100){
                          color="mx-1 list-group-item list-group-item-info"
                          disabledButton.disabled=true
                        }
                        if(reward_rate_to_goal<50){
                          color="mx-1 list-group-item list-group-item-danger"
                          disabledButton.disabled=true
                        }return (
                           <li className={color}>
                             <div>
                               <div className="text-display text-center">
                                 <small>{current_item.goal_type}</small>
                               </div>
                               <NumberFormat
                                 value={current_item.cost}
                                 displayType={"text"}
                                 thousandSeparator={true}
                                 prefix={"#"}
                                 renderText={value => (
                                   <div>
                                     {value} - {reward_rate_to_goal}%
                                   </div>
                                 )}
                               />
                               {/* <div className="text-display text-center">
                                 <small>{}</small>
                               </div> */}
                               <div className="display-center">
                                 <small>
                                   <button
                                     className="btn btn-primary"
                                     {...disabledButton}
                                     onClick={() =>
                                       this.props.redeemUserGoal(
                                         token,
                                         current_item.cost,
                                         username[0].uid,
                                         place_id
                                       )
                                     }
                                   >
                                     Redeem
                                   </button>
                                 </small>
                               </div>
                             </div>
                           </li>
                         );
                      }.bind(this))}
                      </ul>
                    </span>
                  );
              }})()}
            </div>
            <br />
          </div>
        ) : (
          <div className="row">
            <div className="col">
              <small>{username[0] ? username[0].username : "anonymous"}</small>
            </div>
            <div className="col">
              <small>
                {username[0]
                  ? username[0].phone
                    ? username[0].phone
                    : "no-number"
                  : "anonymous"}
                {/* {place_name[0].place_name} */}
              </small>
            </div>
            <div className="col">
              <small>{token}</small>
            </div>
            <div className="col">
              <small>{total_reward_amount}</small>
            </div>
            <div className="col">
              <button onClick={()=>this.showRewardForm()}>
                <i className="fa fa-trophy"></i>
              </button>
            </div>
            <br />
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(OfferAnalytics);
