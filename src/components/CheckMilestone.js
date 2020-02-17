import React from 'react';
import {withFirebase} from '../firebase';
import ProgressBar from './ProgressBar'
import { setTimeout } from 'timers';

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
        this.state={users:[],user_fun_list:[],users_goal_choice:[],users_all_goal_choice:[],percentage:0, user_id:'',all_goal:[],unique_goal:[],selected_business:''}
    }
    componentDidMount() {
        //get all the fun list user has as his ofatri rewards
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.funSlots().orderByChild('user_id').equalTo(authUser.uid).on('value', snapShot => {
                const transactionFunObject = snapShot.val()
                if (transactionFunObject) {
                    const transactionFunArr = Object.keys(transactionFunObject).map(key => ({
                        ...transactionFunObject[key], uid: key
                    }))
                    this.setState({ user_fun_list: transactionFunArr })
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
        })
    }

    handleChange=event=>{
        this.setState({selected_business:event.target.value})

        setTimeout(function(){
            const { users_all_goal_choice, selected_business,users,user_id} = this.state
            const selected_business_user=users.filter(user=>user.username===selected_business)
            const selected_business_user_id=selected_business_user[0].uid;
            const user_goal=users_all_goal_choice[user_id+selected_business_user_id]

            //getting goal according to the selected business
            // const users_goal_choice = users_all_goal_choice.filter(each_goal => each_goal.goal_owner === selected_business)
            this.setState({ users_goal_choice: user_goal })

        }.bind(this),1500)
        
    }
  

    render(){
        //calculate the sum of the unit cost
        const {user_fun_list,users_goal_choice,percentage,all_goal,selected_business,unique_goal}=this.state;
        console.log(users_goal_choice)
        let reward_won=user_fun_list.filter(fun_list=>fun_list.transaction_owner===selected_business)
        console.log(all_goal)
        let sum_total_reward=0;
        let no_transaction=''
        if(reward_won.length>0){
            for(let i=0;i<reward_won.length;i++){
                sum_total_reward+=reward_won[i].status?0:parseInt(reward_won[i].funbees_won)
            }
        }
        if(sum_total_reward===0){
            no_transaction="error"
        }
        console.log(no_transaction)




        return(
                <div className="set-goal">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label for="business">Select Business you Buy from</label>
                                    <select className="form-control" id="business" value={selected_business} onChange={this.handleChange}>
                                    <option value=""></option>
                                    {unique_goal.map(each_goal=>(<option value={each_goal}>{each_goal}</option>))}
                                    </select>
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-12 sm-12">
                                <h3 className="display-text text-white bg-dark text-center">Reward Total is {sum_total_reward}</h3>
                            </div>
                        </div>
                        {(users_goal_choice.length>0 && no_transaction==='') ? <UserGoal users_goal_choice={users_goal_choice} sum_total_reward={sum_total_reward} percentage={percentage}/> :
                        <div className="row">
                            <div className="col">
                                <h3 className="display-4 text-white bg-dark">Set goals and make transactions to view milestone</h3>
                            </div>

                        </div>}
                    </div>
                </div>
        )
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
        

    }

    render(){
        const goal_type=this.props.user_goal.goal_type
        const unit_cost=this.props.user_goal.unit_cost
        let remark="on track"
        let color="orange";
        const ofatri_coin_rank_to_goal= parseInt(this.props.sum_total_reward)>parseInt(this.props.user_goal.unit_cost) ? 100 : parseInt(parseInt(this.props.sum_total_reward)/parseInt(this.props.user_goal.unit_cost)*100)
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


        return(
            <div>
            <div className="col sm-12">
                <strong>{goal_type} ({unit_cost})</strong>
            </div>
            <div className="col sm-12">
                <ProgressBar percentage={ofatri_coin_rank_to_goal} color={color}/>
            </div>
            <div className="col sm-12">
                <strong>{remark}</strong>
            </div>
            </div>
        )
    }
}


export default withFirebase(CheckMilestone)