import React from 'react'
import { withFirebase } from '../firebase'
import { AuthUserContext } from '../session';



class SetNotification extends React.Component{

    constructor(props){
        super(props);
        this.state={notification:"",phone:"",username:"",email:"",updated:false}
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.users().on('value',snapShot=>{
                const userObj=snapShot.val()
                const userArr=Object.keys(userObj).map(key=>({
                    ...userObj[key],uid:key
                }))
                const current_user=userArr.filter(user=>user.uid===authUser.uid);
                const notification=current_user[0].notification?current_user[0].notification:"enabled";
                const phone=current_user[0].phone?current_user[0].phone:"123456789";
                const username=current_user[0].username;
                const email=current_user[0].email;
                this.setState({notification:notification,phone:phone,username:username,email:email})
            })
    })
}

        setNotification=()=>{
            const notification=this.state.notification;
            if(notification==="enabled"){
                this.setState({notification:"disabled"})
            }
            else{
                this.setState({notification:"enabled"})
            }

        }

        saveSetting=(e,authUser)=>{
            const {notification,phone,username,email}=this.state;
            this.props.firebase.user(authUser.uid).set({
                email:email,
                phone:phone,
                username:username,
                notification:notification
            });

            this.setState({updated:true})
            e.preventDefault()
        }



    render(){
        const {notification,updated}=this.state
        return(
            <div>
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
                                <div className="col-lg-12">
                                {updated && <h3 className="card-title">Settings Updated Successfully</h3>}
                                <div className="well well-bg bg-dark">
                                    <div className="form-check-inline">
                                        <span className="mx-2"><label className="mx-1 text-white" for="notification">Recieve New Offers Alert</label><input className="form-check-input" name="notification" type="checkbox" checked={notification==="enabled"} onChange={this.setNotification} /></span>
                                    </div>
                                </div>
                                <br/>
                                    <div className="form-group">
                                        <button className="form-control btn btn-success" onClick={(e)=>this.saveSetting(e,authUser)}>Save Setting</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </AuthUserContext>
            </div>
        )
    }
}

export default withFirebase(SetNotification)