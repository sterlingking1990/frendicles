import React from 'react';
import { withFirebase } from '../firebase';
import { AuthUserContext } from '../session';
import { setTimeout } from 'timers';
import NumberFormat from "react-number-format";

//use goal.uid to get all the goal settings for a particular user logged in o.e goal.uid===user_id(saved on mount)

const INITIALS={
    goal: [],
    all_goal:[],
    user_goal_choice:[],
    user_all_goal_choice:[],
    added:false,
    saved:false,
    user_id:'',
    select_all_goal:false,
    selected_business:'',
    unique:[],
    users:[]
}
class SetRewardGoal extends React.Component{
    constructor(props){
    super(props);
    this.state={...INITIALS}
    }

    componentDidMount(){
        //get the list of all goal crated by admin---
        this.props.firebase.adminGoalSettings().on('value',adminGoalSnapShot=>{
            const adminGoalObj=adminGoalSnapShot.val()
            if(adminGoalObj){
                const adminGoalArr=Object.keys(adminGoalObj).map(key=>({
                    ...adminGoalObj[key],uid:key
                }))

                //get the unique business names
                let unique_details=adminGoalArr.map(each_goal=>each_goal.goal_owner)
                let item_unique=[]
                unique_details.map(each=>{
                if(!item_unique.includes(each)){
                    item_unique.push(each)
                }    
                })
                console.log(item_unique)
                this.setState({all_goal:adminGoalArr,unique:item_unique})
            }
        })

        this.props.firebase.users().on('value',snapShot=>{
            const userObj=snapShot.val()
            const userArr=Object.keys(userObj).map(key=>({
                ...userObj[key],uid:key
            }))
            this.setState({users:userArr})
        })

        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            //get all goal setting for everybody
            this.props.firebase.goalSettings().on('value',snapShot=>{
                const userGoalSettingArr=snapShot.val(); //because we use set to store the data, it will be retrieved as an object with the parameter used 
                //when saving the data as the key in organizing the retrieval i.e key1(user_id was parameter used in saving the data didnt push but used set method):[{},{},{}]
                //so others will follow as [key1:[{},{},{}],key2:[{},{}],...keyn:[{},...]]
                if(userGoalSettingArr){  //means there was some record of users gaol setting found
                //getting the current user goal setting
                //const current_user_goal_settings=userGoalSettingArr[authUser.uid]
                // const userGoal=Object.keys(userGoalSettingArr).map(key=>({
                //     ...userGoalSettingArr[key],uid:key
                // }))

                // const current_user_goal=Object.keys(userGoal[0]).map(key=>({
                //     ...userGoal[0][key]
                // }))
                console.log(userGoalSettingArr)
                this.setState({user_all_goal_choice:userGoalSettingArr,user_id:authUser.uid})
            }
            else{
                this.setState({user_id:authUser.uid})
            }
            })
        })
    }

    handleChange = event => {
        this.setState({ selected_business: event.target.value })
       
        //getting goal according to the selected business
        setTimeout(function(){
        const { user_all_goal_choice, selected_business, all_goal,user_id,users } = this.state
        const selected_business_user=users.filter(each_user=>each_user.username===selected_business)
        const selected_business_user_id=selected_business_user[0].uid
        const goal_choice = user_all_goal_choice[user_id+selected_business_user_id]
        // const user_goal_choice=goal_choice?goal_choice.filter(goal=>goal.goal_owner===selected_business):[]
        const goal = all_goal.filter(each_goal => each_goal.goal_owner === selected_business)
        this.setState({ user_goal_choice: goal_choice, goal: goal })
        }.bind(this), 1500);

    }

   

    handleSelectGoal=(goal_id,type,cost,goal_owner,goal_owner_id)=>{
        const user_id = this.state.user_id;
        const user_goal_choice = this.state.user_goal_choice;
        const goal_choice=user_goal_choice ? Array.from(user_goal_choice) : [];
        const is_goal_in_choice = user_goal_choice ? user_goal_choice.filter(goal => goal.uid === goal_id) : [];
        const goal_to_add={
                uid:goal_id,
                user_id:user_id,
                type:type,
                cost:cost,
                goal_owner:goal_owner,
                goal_owner_id:goal_owner_id
            }
        console.log(goal_to_add)
        console.log(user_goal_choice)
        
        if(is_goal_in_choice.length>0) {
            console.log(is_goal_in_choice)

            //means the goal already has been added
            //hence the user meant remove the goal
            const updated_goal=user_goal_choice.filter(goal=>goal.uid!==goal_id)
            this.setState({user_goal_choice:updated_goal,added:false,select_all_goal:false})
        }
        else{
            //it doesnt exisit the user wants to add it to the list of goals
            //if adding for first time, push to goal_choice and set user goal choice
                goal_choice.push(goal_to_add)
                this.setState({ user_goal_choice: goal_choice, added: true });
        }

        // if(!user_goal_choice){

        //     console.log("not goal choice")
        //     //adding for the first time

        //     goal_choice.push(goal_to_add)
        //     this.setState({ user_goal_choice: goal_choice, added: true });
        // }

        console.log(user_goal_choice)
    }

    saveGoalSettings=()=>{
        const {selected_business,users,user_id,user_goal_choice}=this.state
        if(selected_business && user_goal_choice){
            const selected_business_id=users.filter(user=>user.username===selected_business)
            const business_id=selected_business_id[0].uid
            this.props.firebase.goalSetting(user_id+business_id).set({
                ...user_goal_choice
            })
            this.setState({saved:true})

            setTimeout(function() {
                this.setState({saved:false})
            }.bind(this), 2000);
        }
    }

    handleSelectAllGoal=()=>{
        const user_goal=this.state.user_goal_choice;
        const select_all_checked=this.state.select_all_goal
        console.log(select_all_checked)
        const admin_goal=this.state.goal;
        console.log(user_goal)
        console.log(admin_goal)
        if(user_goal){
            if(user_goal.length===admin_goal.length){
            //means all have been selected before, user wants to deselect all
            this.setState({user_goal_choice:[],select_all_goal:false})
            }
            else{
            //means the useer wants to select all item and make user goal choice same length with admin goal
            this.setState({select_all_goal:true,user_goal_choice:admin_goal})
            }
        }
        else{
            this.setState({select_all_goal:true,user_goal_choice:admin_goal})
        }
    }


    render(){
        const {goal,all_goal,user_goal_choice,saved,select_all_goal,selected_business,unique} = this.state
        console.log(all_goal)
        console.log(user_goal_choice)
        
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
                                <label for="business_name">Select Marketer or Seller you Buy from</label>
                                <select className="form-control" id="business_name" value={selected_business} onChange={this.handleChange}>
                                <option value=""></option>
                                {unique.map(each_goal=>(<option value={each_goal}>{each_goal}</option>))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="goal-container">
                    <p className="display-text text-center text-white bg-dark">{user_goal_choice?user_goal_choice.length:0} Goals Selected</p>
                    <div className="goal-controls">
                        <div className="grid-control">                            
                            <div><label for="goal-control">Select all</label> <input type="checkbox" value={select_all_goal} checked={select_all_goal} onChange={this.handleSelectAllGoal}/></div>
                            {saved && <div>Your Reward Goal Have Been Saved Successfully</div>}
                            <div><button id="submit-goal-setting" onClick={this.saveGoalSettings}>Save Settings</button></div>
                        </div>
                    </div>
                </div>
                    <Goalisting goal={goal} user_goal_choice={user_goal_choice} handleSelectGoal={this.handleSelectGoal} />
        </div>
        )
    }
}

const Goalisting=({goal,handleSelectGoal,user_goal_choice})=>(
    <div className="goal-types">
            {goal.map(each_goal => (<GoalTemplate key={each_goal.uid} goal_id={each_goal.uid} goal={each_goal} user_goal_choice={user_goal_choice} handleSelectGoal={handleSelectGoal}/>))}
        </div>
)

class GoalTemplate extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        const imageUrl=this.props.goal.goal_image;
        const goal_id=this.props.goal_id;
        let color='white';
        if(this.props.user_goal_choice){
            //loop through the current user goal setting to check for wether the goal_id from user goal setting is same as the id of the goal set by admin
            //if the same hence the user added that goal to his goal setting record;;;make it green to indicat
            const is_goal_present=this.props.user_goal_choice.filter(goal=>goal.uid===goal_id)
            console.log(is_goal_present.length)
            if(is_goal_present.length>0){
                color='green'
            }
            else{
                color='white'
            }
                
            }
        const style = {
            backgroundImage: 'url(' + imageUrl + ')',
            borderColor: color,
        }
        
        return (
          <div
            className="goal-type"
            style={style}
            onClick={() =>
              this.props.handleSelectGoal(
                goal_id,
                this.props.goal.goal_type,
                this.props.goal.unit_cost,
                this.props.goal.goal_owner,
                this.props.goal.goal_owner_id
              )
            }
          >
            <h3 id="goal">{this.props.goal.goal_type}</h3>
            <NumberFormat
              value={this.props.goal.unit_cost}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"oc"}
              renderText={value => (
                <div id="cost" className="text-display text-white">
                  {value}
                </div>
              )}
            />
          </div>
        );
    }
}

export default withFirebase(SetRewardGoal)