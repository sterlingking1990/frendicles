import React from 'react'
import {withFirebase} from '../firebase'
import { history } from '../routers/AppRouter'
import {Link} from 'react-router-dom'
import {PasswordRecoveryLink} from './ForgetPasswordPage'

const SignInPage=()=>(
    <div>
        <SignInHandler/>
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
            console.log(history)
            this.setState({...INITIAL_DETAILS})
            history.push('/')
            history.go(0)
        })
        .catch(error=>this.setState({...INITIAL_DETAILS,error:error.message}))
    }

    render(){
        const {
            email,
            password,
            error,
        }=this.state

        return (
          <div className="login">
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
                <div className="container mt-3">
                  <div className="row">
                    <div className="col-lg-12 sm-12">
                      {error && (
                        <div className="card bg-dark">
                          <div className="card-body">
                            <p className="text-display text-center text-white">
                              {error}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="form-group">
                        <input
                          name="email"
                          type="email"
                          placeholder="email"
                          className="form-control"
                          value={email}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="password"
                          type="password"
                          placeholder="enter password"
                          className="form-control"
                          value={password}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="form-control btn-success"
                          onClick={this.onSignIn}
                        >
                          Log In
                        </button>
                      </div>
                      <div className="form-group">
                        {error && (
                          <p className="text-red bg-white">{error.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <PasswordRecoveryLink />
                    <SignUpLink />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}



const SignUpLink=()=>(
            <div className="col-lg-12 sm-12">
                <div className="form-group">
                    <p className="text-success">Dont have an account? <Link to="/signup"> Sign Up</Link></p>
                </div>
            </div>
)



const SignInHandler= withFirebase(SignInHOC)

export default SignInPage
export {SignInHandler}