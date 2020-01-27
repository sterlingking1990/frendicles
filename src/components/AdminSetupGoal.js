import React from 'react'
import {withFirebase} from '../firebase'


const INITIALS={
    goal_type:'',
    unit_cost:'',
    goal_image:'',
    admin_goal_list:[],
    cant_save:false,
    saved:false,
}
class AdminSetupGoal extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIALS}

    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})

    }

    saveGoal=()=>{
        const goal_type=this.state.goal_type;
        const unit_cost=this.state.unit_cost;
        const goal_image=this.state.goal_image;

        const is_error= goal_type===''  || unit_cost==='' || goal_image===''
        if(is_error){
            this.setState({cant_save:true})

            setTimeout(function(){
                this.setState({cant_save:false})
            }.bind(this), 2000);

        }
        else{
            this.props.firebase.adminGoalSettings().push({
                goal_type,
                unit_cost,
                goal_image
            })
            this.setState({saved:true})

            setTimeout(function(){
                this.setState({saved:false})
            }.bind(this), 2000);



        }

    }

    render(){
        const {goal_type,unit_cost,goal_image,saved,cant_save}=this.state

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

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            {saved && <h3 className="display-text text-success bg-dark">Saved successfully</h3>}
                            {cant_save && <h3 className="display-text text-success bg-dark"> Please check all fields are filled and valid</h3>}
                            <div className="form-group">
                                <input type="text" name="goal_type" value={goal_type} className="form-control" placeholder="enter the type of goal"  onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input type="number" name="unit_cost" value={unit_cost} className="form-control" placeholder="enter goal unit cost" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="goal_image" value={goal_image} className="form-control" placeholder="input image url for further explanation" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <button className="form-control btn-success" onClick={this.saveGoal}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withFirebase(AdminSetupGoal)