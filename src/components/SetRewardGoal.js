import React from 'react';
import { withFirebase } from '../firebase';


const INITIALS={
goal:[{type:'trip_to_dubia',cost:2000},{type:'fantasy_adventure',cost:10000},{type:'live_football_match',cost:20000}],
user_choice:[],
}
class SetRewardGoal extends React.Component{
    constructor(props){
    super(props);
    this.state={...INITIALS}
    }

    render(){
        const {goal} = this.state;
        return(
            <div className="set-goal">
                <div className="section">
                    <div className="banner">

                    </div>
                    <div className="banner-text">
                        <h3>Let us help you meet any of these goals as you continue to make transactions</h3>
                        <p>Select goals that you look forward to and we will help you reach them</p>
                    </div>
                </div>

                <div className="goal-container">
                    <div className="goal-controls">
                        <div className="grid-control">
                            <div><label for="goal-control">Select all</label> <input type="checkbox" checked="true"/></div>
                            <div><button id="submit-goal-setting">Done</button></div>
                        </div>
                    </div>
                </div>

                <div className="goal-types">
                      {goal.map(each_goal=>(<div className="goal-type"><h3 id="goal">{each_goal.type}</h3><div id="cost">{each_goal.cost}</div></div>))}
                </div>
        </div>
        )
    }
}

export default withFirebase(SetRewardGoal)