import React from 'react';
import {withFirebase} from '../firebase';
import ProgressBar from './ProgressBar'
import { setTimeout } from 'timers';
import NumberFormat from "react-number-format";

//steps
//1- sum the total for funbee amount from funSlots for this particualr user
//2- get the list of users selected goal
//3-loop through the selected goal and create a template for view
//4- on that template; th value now for the progress bar should be the total funbee amount/ the current goal unit cost * 100
//4a you can make options based on the value now for things like half way to reaching your goal, congratulations,ready to redeem, you are on your mark; stay steady with transactions and you will meet your goal in no time
//style and make labels accordingly


class CheckMilestone extends React.Component{
    constructor(props){
        super(props);
        this.state={users:[],places:[],user_fun_list:[],users_goal_choice:[],users_all_goal_choice:[],percentage:0, user_id:'',all_goal:[],unique_goal:[],selected_business:'',selected_business_user_id:'',place_id:'',amount_by_current_user:0,fetch_successful:false}
    }
    componentDidMount() {
        //get all the fun list user has as his ofatri rewards
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.funSlotUpdates().on('value', snapShot => {
                const transactionFunObject = snapShot.val()
                if (transactionFunObject) {
                    const transactionFunArr = Object.keys(transactionFunObject).map(key => ({
                        ...transactionFunObject[key], uid: key
                    }))
                    this.setState({ user_fun_list: transactionFunArr})
                    
                }
                else {
                    this.setState({ user_fun_list: [] })
                }
            })

            //get all the goals on mount

            this.props.firebase.adminGoalSettings().on('value', adminGoalSnapShot => {
                const adminGoalObj = adminGoalSnapShot.val()
                if (adminGoalObj) {
                    const adminGoalArr = Object.keys(adminGoalObj).map(key => ({
                        ...adminGoalObj[key], uid: key
                    }))

                    //filter based on selected goal owner
                    let unique_details=[]
                    adminGoalArr.map(each=>{
                        if(!unique_details.includes(each.goal_owner)){
                            unique_details.push(each.goal_owner)
                        }
                    })
                    this.setState({ all_goal: adminGoalArr,unique_goal:unique_details })
                }
            })

            //get the users goal list
            this.props.firebase.goalSettings().on('value', snapShot => {
                const userGoalSettingArr = snapShot.val(); //because we use set to store the data, it will be retrieved as an object with the parameter used 
                //when saving the data as the key in organizing the retrieval i.e key1(user_id was parameter used in saving the data didnt push but used set method):[{},{},{}]
                //so others will follow as [key1:[{},{},{}],key2:[{},{}],...keyn:[{},...]]
                if (userGoalSettingArr) {  //means there was some record of users gaol setting found
                    //getting the current user goal setting
                    // const current_user_goal_settings = userGoalSettingArr[authUser.uid]
                    this.setState({ users_all_goal_choice: userGoalSettingArr, user_id: authUser.uid })
                }
                else {
                    this.setState({ user_id: authUser.uid })
                }
            })

            //get users
            this.props.firebase.users().on('value', snapShot => {
                const userObj = snapShot.val()
                const userArr = Object.keys(userObj).map(key => ({
                    ...userObj[key], uid: key
                }))
                this.setState({ users: userArr })
            })

            //get places
            this.props.firebase.places().on('value', snapShot => {
                const placeObj = snapShot.val()
                const placeArr = Object.keys(placeObj).map(key => ({
                    ...placeObj[key], uid: key
                }))
                this.setState({ places: placeArr })
            })

            
        })
    }

    handleChange=event=>{
        this.setState({selected_business:event.target.value})

        setTimeout(function(){
            const { users_all_goal_choice, selected_business,users,user_id,places,user_fun_list} = this.state
            const selected_business_user=users.filter(user=>user.username===selected_business)
            const selected_business_user_id=selected_business_user[0].uid;

            const user_goal=users_all_goal_choice[user_id+selected_business_user_id]
            var arrFun = [];
            this.props.firebase.funSlotUpdates().on("value", snapShot => {
              const funSlotObj = snapShot.val();
              const funSlotArr = Object.keys(funSlotObj).map(key => ({
                ...funSlotObj[key],
                uid: key
              }));
              //get the funSlot- all rewards for the current user
              for (let i = 0; i < funSlotArr.length; i++) {
                if (funSlotArr[i].uid === user_id) {
                  arrFun.push(funSlotArr[i]);
                }
              }
            });


            //check if the current user has been rewarded else let it be 0
            if(arrFun.length>0){
              //get the places where the user has sleected then filter out its keys-
                let place_user_selected=places.filter(place=>place.userId===selected_business_user_id)
                const place_keys=[]
                for(let p=0;p<place_user_selected.length;p++){
                  place_keys.push(place_user_selected[p].uid)
                }
              
                //now we got the keys, lets sum the reward amount where the current user was rewarded on each offer(place keys) for the selected place
                var total_reward_for_user = 0;
                for (let x = 0; x < place_keys.length; x++) {
                  if(!!arrFun[0][place_keys[x]]){
                  total_reward_for_user =
                    parseInt(total_reward_for_user) +
                    parseInt(arrFun[0][place_keys[x]].funbees_won);
                  }
                  
                }
            }
            else{
              var total_reward_for_user=0
            }


            this.setState({amount_by_current_user:total_reward_for_user})
                  
            
            

            //getting goal according to the selected business
            // const users_goal_choice = users_all_goal_choice.filter(each_goal => each_goal.goal_owner === selected_business)
            this.setState({ users_goal_choice: user_goal,selected_business_user_id:selected_business_user_id,fetch_successful:true })

        }.bind(this),1500)
        
    }
  

    render(){
        //calculate the sum of the unit cost
        const {users_goal_choice,percentage,selected_business,unique_goal,amount_by_current_user,fetch_successful}=this.state;
        console.log(users_goal_choice)
      
        return (
          <div className="set-goal">
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

            <div className="container mt-3">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label for="business">Select Business you Buy from</label>
                    <select
                      className="form-control"
                      id="business"
                      value={selected_business}
                      onChange={this.handleChange}
                    >
                      <option value=""></option>
                      {unique_goal.map(each_goal => (
                        <option value={each_goal}>{each_goal}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="container mt-3">
              <div className="row">
                <div className="col-lg-12 sm-12">
                  <NumberFormat
                    value={amount_by_current_user}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"oc"}
                    renderText={value => (
                      <h3 className="display-text text-white bg-dark text-center">
                        Reward Total is {value}
                      </h3>
                    )}
                  />
                </div>
              </div>
              {fetch_successful &&
              (users_goal_choice ? users_goal_choice.length > 0 : false) &&
              amount_by_current_user > 0 ? (
                <UserGoal
                  users_goal_choice={users_goal_choice}
                  sum_total_reward={amount_by_current_user}
                  percentage={percentage}
                />
              ) : (
                <div className="row">
                  <div className="col">
                    <small>
                      <h3 className="display-text text-white text-center bg-dark">
                        Set goals and make transactions to view milestone
                      </h3>
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
    }
}

const UserGoal=({users_goal_choice,sum_total_reward,percentage})=>(
    <div className="row">
        {users_goal_choice.map(user_goal=>(<UserGoalTemplate user_goal={user_goal} sum_total_reward={sum_total_reward} percentage={percentage}/>))}
    </div>

)

class UserGoalTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={user_goal:this.props.user_goal,sum_total_reward:this.props.sum_total_reward}
    }

    render(){
        const {user_goal,sum_total_reward}=this.state
        const goal_type=user_goal.type
        const unit_cost=user_goal.cost
        let remark="on track"
        let color="orange";
        const ofatri_coin_rank_to_goal= parseInt(sum_total_reward)>parseInt(unit_cost) ? 100 : parseInt(parseInt(sum_total_reward)/parseInt(unit_cost)*100)
        if(ofatri_coin_rank_to_goal > 50 && ofatri_coin_rank_to_goal < 60){
            remark="half way to goal"
            color="magenta"
        }
        if(ofatri_coin_rank_to_goal >60 && ofatri_coin_rank_to_goal <90){
            remark="few steps mores"
            color="brown"
        }
        if(ofatri_coin_rank_to_goal===100){
            remark="congratulations, redeemable"
            color="green"
        }


        return (
          <div>
            <div className="col sm-12">
              <NumberFormat
                value={unit_cost}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"oc"}
                renderText={value => (
                  <small className="text-display text-center">
                    <strong>
                      {goal_type} ({value})
                    </strong>
                  </small>
                )}
              />
            </div>
            <div className="col sm-12">
              <ProgressBar
                percentage={ofatri_coin_rank_to_goal}
                color={color}
              />
            </div>
            <div className="col sm-12">
              <small className="text-display text-center">
                <strong>
                  <i>{remark}&nbsp;</i>
                </strong>
                <span>{ofatri_coin_rank_to_goal}% reached</span>
              </small>
            </div>
          </div>
        );
    }
}


export default withFirebase(CheckMilestone)