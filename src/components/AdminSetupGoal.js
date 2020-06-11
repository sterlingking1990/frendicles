import React from 'react'
import {withFirebase} from '../firebase'
import { AuthUserContext } from '../session';
import NumberFormat from "react-number-format";


const INITIALS={
    goal_type:'',
    unit_cost:'',
    goal_image:'',
    user_id:'',
    username:'',
    admin_goal_list:[],
    cant_save:false,
    saved:false,
    progress:'',
    url:'',
    admin_goal:[],
}
class AdminSetupGoal extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIALS}

    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            this.props.firebase.users().on('value',snapShot=>{
                const userObj=snapShot.val()
                const userArr=Object.keys(userObj).map(key=>({
                    ...userObj[key],uid:key
                }))
                const current_user=userArr.filter(user=>user.uid===authUser.uid)
                this.setState({username:current_user[0].username})
            })

            //get this current users list of goals
            this.props.firebase.adminGoalSettings().on('value',snapShot=>{
                const adminGoalObj=snapShot.val()
                const adminGoalArr=Object.keys(adminGoalObj).map(key=>({
                    ...adminGoalObj[key],uid:key
                }))
                const current_admin_goal=adminGoalArr.filter(goal=>goal.goal_owner_id===authUser.uid)
                this.setState({admin_goal:current_admin_goal})
            })
        })
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})

    }

    handleImageChange=event=>{
        if(event.target.files[0]){
            const goal_image=event.target.files[0];
            this.setState(()=>({goal_image}))
        }
    }

    saveGoal=(e,authUser)=>{
        const goal_type=this.state.goal_type;
        const unit_cost=this.state.unit_cost;
        const goal_image=this.state.goal_image;
        const goal_owner_id=authUser.uid;
        const goal_owner=this.state.username;
        

        const is_error= goal_type===''  || unit_cost==='' || goal_image===''
        if(is_error){
            this.setState({cant_save:true})

            setTimeout(function(){
                this.setState({cant_save:false})
            }.bind(this), 2000);

        }
        else{
            //upload the image
            this.props.firebase.imageStore(goal_image.name).put(goal_image).on("state_changed",snapShot=>{
                //get the progress
                const progress=Math.round((snapShot.bytesTransfered/snapShot.totalBytes)*100)

                this.setState({ progress });
            }, error=>{
                console.log(error)
            },()=>{
                //complete the image storage
                this.props.firebase.imageStores().child(goal_image.name).getDownloadURL().then(url=>{
                    this.props.firebase.adminGoalSettings().push({
                        goal_type: goal_type,
                        unit_cost: unit_cost,
                        goal_image: url,
                        goal_owner_id: goal_owner_id,
                        goal_owner: goal_owner,
                    })
                    this.setState({ saved: true, url:url })

                    setTimeout(function () {
                        this.setState({ saved: false })
                    }.bind(this), 2000);


                })
            });
        }

        e.preventDefault()

    }

    onDeleteGoal=uid=>{
        this.props.firebase.adminGoalSetting(uid).remove()
    }

    render(){
        const {goal_type,unit_cost,saved,cant_save,admin_goal}=this.state

        return(
            <div className="set-goal">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>

                <AuthUserContext>
                    {authUser=>(
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
                                    <input type="file" id="myFile" className="form-control" name="goal_image" onChange={this.handleImageChange}/>

                                            
                                {/* <input type="text" name="goal_image" value={goal_image} className="form-control" placeholder="input image url for further explanation" onChange={this.onChange}/> */}
                            </div>
                            <div className="form-group">
                                <button className="form-control btn-success" onClick={(e)=>this.saveGoal(e,authUser.authState)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                    )}
                </AuthUserContext>
                <div className="container mt-3">
                    <div className="row">
                        <AdminGoalList admin_goal={admin_goal}  onDeleteGoal={this.onDeleteGoal} />
                    </div>
                </div>
            </div>
        )
    }
}

const AdminGoalList=({admin_goal,onDeleteGoal})=>(
    <div>
        {admin_goal.map(each_goal=>(<GoalTemplate key={each_goal.uid} each_goal={each_goal} onDeleteGoal={onDeleteGoal}/>))}
    </div>)

class GoalTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state = {goal_id:this.props.each_goal.uid,goal_type:this.props.each_goal.goal_type,unit_cost:this.props.each_goal.unit_cost,goal_image:this.props.each_goal.goal_image}
    }

    onDeleteGoal=()=>{
        this.props.onDeleteGoal(this.state.goal_id)
    }

    render(){
        const {goal_type,unit_cost,goal_image}=this.state
        return (
          <div className="col">
            <div className="card bg-dark text-white">
              <span className="text-right text-sm text-display">
                <i
                  className="fa fa-remove mx-2 text-red"
                  id="delete_place"
                  onClick={this.onDeleteGoal}
                ></i>
              </span>
              <h3 className="card-title">{goal_type}</h3>
              <div className="card-body">
                <img
                  className="card-img img-responsive img-fluid"
                  src={goal_image}
                  alt="goal-image"
                />
              </div>
              <div className="card-footer">
                <NumberFormat
                  value={unit_cost}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"oc"}
                  renderText={value => (
                    <p className="text-display text-center text-white">
                      {value}
                    </p>
                  )}
                />
              </div>
            </div>
            <br />
          </div>
        );
    }
}

export default withFirebase(AdminSetupGoal)