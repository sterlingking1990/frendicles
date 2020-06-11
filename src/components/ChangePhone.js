import React from 'react'
import { AuthUserContext } from '../session';
import { withFirebase } from '../firebase';

class ChangePhone extends React.Component{
    constructor(props){
        super(props);
        
        this.state={phone:'',username:'',email:'',updated:false,not_num:false}
    }

    setPhone=event=>{
        this.setState({phone:event.target.value})
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser => {
            this.props.firebase.users().on('value', snapShot => {
                const userObj = snapShot.val()
                const userArr = Object.keys(userObj).map(key => ({
                    ...userObj[key], uid: key
                }))
                const current_user = userArr.filter(user => user.uid === authUser.uid);
                const phone = current_user[0].phone?current_user[0].phone:"123456789";
                const email=current_user[0].email
                const username=current_user[0].username
                console.log(phone,username,email)
                this.setState({ phone: phone,username:username,email:email })
            })
        })
    }

    updatePhone=(e,authUser)=>{
        const {phone,username,email}=this.state
        if(phone.length===11){
        this.props.firebase.user(authUser.uid).set({
            email:email,
            phone,
            username:username,
        })
        this.setState({updated:true})
        }

        else{
            this.setState({not_num:true})
        }

        e.preventDefault()
    }


    render(){
        const {phone,not_num,updated}=this.state
        const isInvalid=phone==='' || not_num===true
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
                                    <div className="well well-bg bg-dark">
                                        <div className="card">
                                            <h3 className="card-title text-center">Update Your Mobile Contact</h3>
                                            {updated && <p className="text-display bg-dark text-center text-white">Phone number updated successfully</p> }
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <input type="number" className="form-control" value={phone} onChange={this.setPhone} />
                                                </div>
                                                <div className="form-group">
                                                    <button className="form-control btn btn-success" onClick={(e) => this.updatePhone(e,authUser.authState)}  disabled={isInvalid}>Update</button>
                                                </div>
                                            </div>
                                        </div>
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

export default withFirebase(ChangePhone)