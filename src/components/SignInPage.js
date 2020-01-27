import React from 'react'
import {withFirebase} from '../firebase'
import { history } from '../routers/AppRouter'
import {Link} from 'react-router-dom'
import {PasswordRecoveryLink} from './ForgetPasswordPage'

const SignInPage=()=>(
    <div>
        <SignInHandler/>
        <PasswordRecoveryLink/>
        <SignUpLink/>
    </div>

)

const INITIAL_DETAILS={
    email:'',
    password:'',
    error:null,
}
class SignInHOC extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_DETAILS}
    }

    onChange=event=>{

        this.setState({[event.target.name]:event.target.value})
    }

    onSignIn=()=>{
        const {email,password}=this.state;
        this.props.firebase
        .doSignInWithEmailAndPassword(email,password)
        .then(()=>{
            this.setState({...INITIAL_DETAILS})
            history.push('/')
        })
        .catch(error=>this.setState({...INITIAL_DETAILS,error:error.message}))
    }

    render(){
        const {
            email,
            password,
            error,
        }=this.state

        return(
            <div className="login">
                <div className="login-section">
                    <div className="login-banner">
                        <div className="login-banner-text">
                            <h3>Welcome back, Continue Enjoying Rewards on Every Transaction You Make</h3>
                            <span><strong>Sign In to Continue</strong></span>
                        </div>
                    </div>
                </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                            {error && <h3 className="text-display text-white bg-dark">{error}</h3>}
                        <div className="form-group">

                            <input name="email" type="email" placeholder="email" className="form-control" value={email} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" placeholder="enter password" className="form-control" value={password} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn-success" onClick={this.onSignIn}>Log In</button>
                        </div>
                        <div className="form-group">
                            {error && <p className="text-red bg-white">{error.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const SignUpLink=()=>(
    <div className="container mt-3">
        <div className="row">
            <div className="col-lg-12 sm-12">
                <div className="form-group">
                    <p className="text-success">Dont have an account? <Link to="/signup"> Sign Up</Link></p>
                </div>
            </div>
        </div>
    </div>
)

const SignInHandler= withFirebase(SignInHOC)

export default SignInPage
export {SignInHandler}