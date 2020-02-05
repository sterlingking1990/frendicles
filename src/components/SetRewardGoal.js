import React from 'react';
import { withFirebase } from '../firebase';
import { AuthUserContext } from '../session';

//use goal.uid to get all the goal settings for a particular user logged in o.e goal.uid===user_id(saved on mount)

const INITIALS={
    goal: [],
    user_goal_choice:[],
    added:false,
    saved:false,
    user_id:'',
    select_all_goal:false,
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
                this.setState({goal:adminGoalArr})
            }
        })


        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            //get all goal setting for everybody
            this.props.firebase.goalSettings().on('value',snapShot=>{
                const userGoalSettingArr=snapShot.val(); //because we use set to store the data, it will be retrieved as an object with the parameter used 
                //when saving the data as the key in organizing the retrieval i.e key1(user_id was parameter used in saving the data didnt push but used set method):[{},{},{}]
                //so others will follow as [key1:[{},{},{}],key2:[{},{}],...keyn:[{},...]]
                if(userGoalSettingArr){  //means there was some record of users gaol setting found
                //getting the current user goal setting
                const current_user_goal_settings=userGoalSettingArr[authUser.uid]
                this.setState({user_goal_choice:current_user_goal_settings,user_id:authUser.uid})
            }
            else{
                this.setState({user_id:authUser.uid})
            }
            })
        })
    }

    handleSelectGoal=(goal_id,type,cost)=>{
        const goal_choice=[];
        const user_id=this.state.user_id;
        const is_goal_in_choice=this.state.user_goal_choice.filter(goal=>goal.uid===goal_id);
        if(is_goal_in_choice.length>0) {
            //means the goal already has been added
            //hence the user meant remove the goal
            const updated_goal=this.state.user_goal_choice.filter(goal=>goal.uid!==goal_id)
            this.setState({user_goal_choice:updated_goal,added:false,select_all_goal:false})
        }
        else{
            //means the user wants to add to the goal
            
            const goal_to_add={
                uid:goal_id,
                user_id:user_id,
                type:type,
                cost:cost,
            }

            goal_choice.push(...this.state.user_goal_choice,goal_to_add)
            this.setState({user_goal_choice:goal_choice,added:true})
        }
        }

    saveGoalSettings=(authUser)=>{
        const user_id=authUser.uid;
       
        this.props.firebase.goalSetting(user_id).set({
            ...this.state.user_goal_choice
        })
        this.setState({saved:true})

        setTimeout(function() {
            this.setState({saved:false})
        }.bind(this), 2000);
        
    }

    handleSelectAllGoal=()=>{
        const user_goal=this.state.user_goal_choice;
        const admin_goal=this.state.goal;
        if(user_goal.length===admin_goal.length){
            //means all have been selected before, user wants to deselect all
            this.setState({user_goal_choice:[],select_all_goal:false})

        }
        else{
            //means the useer wants to select all item and make user goal choice same length with admin goal
            this.setState({select_all_goal:true,user_goal_choice:admin_goal})
        }
        
    }


    render(){
        const {goal,user_goal_choice,saved,select_all_goal} = this.state;
        return(
            <div className="set-goal">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>

                <div className="goal-container">
                    <div className="goal-controls">
                        <div className="grid-control">                            
                            <div><label for="goal-control">Select all</label> <input type="checkbox" value={select_all_goal} checked={select_all_goal} onChange={this.handleSelectAllGoal}/></div>
                            {saved && <div>Your Reward Goal Have Been Saved Successfully</div>}
                            <div><AuthUserContext>{authUser => (<button id="submit-goal-setting" onClick={()=>this.saveGoalSettings(authUser)}>Save Settings</button>)}</AuthUserContext></div>
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
        if(this.props.user_goal_choice.length>0){
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
        
        return(
            <div className="goal-type" style={style} onClick={()=>this.props.handleSelectGoal(goal_id,this.props.goal.goal_type,this.props.goal.unit_cost)}>
                <h3 id="goal">{this.props.goal.goal_type}</h3>
                <div id="cost" className="text-display text-white">{this.props.goal.unit_cost}</div>
            </div>
        )
    }
}

export default withFirebase(SetRewardGoal)