import React,{Component} from 'react'
import {withFirebase} from '../firebase'
import {withRouter} from 'react-router-dom'
import {history} from '../routers/AppRouter'

const SignUpPage=()=>(
    <div>
        <SignUpTemplate/>
    </div>

)

const INITIAL_DETAILS = {
    username:'',
    email: '',
    phone:'',
    password: '',
    confirmPassword: '',
    error: null,
    send_mail:false,

}
class SignUpHOC extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_DETAILS };
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { username,email,phone,password } = this.state;
        
      this.props.firebase
      .doCreateUserWithEmailAndPassword(username,email,phone,password)
      .then(()=>{
          this.setState({ ...INITIAL_DETAILS,send_mail:true}); 
          //set time out before redirecting to home page---after 2000 secs, then redirect...by then you must have used the send mail(true) to notify user that email
          //has been sent to his mail, please check your mail to know about best tips to win rewards...
          setTimeout(function(){
            this.setState({send_mail:false})
            history.push('/')
          }.bind(this), 3000);
                 
      })
      .catch(error => this.setState({ ...INITIAL_DETAILS,error:error.message }));
   
    event.preventDefault();
  }

    render() {
        const {
            username,
            email,
            phone,
            password,
            confirmPassword,
            error,
            send_mail,
        } = this.state;

        const isInvalid = password !== confirmPassword || password === '' || email === '' || phone === '' || username ==='';

        return (

            <div className="signup">
               <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                    </div>
                    <div className="sign-up-flow">
                        <div className="container mt-3">
                            <div className="row">
                                <div className="col-lg-12 sm-12">
                                    {error && <h3 className="text-display text-white bg-dark">{error}</h3>}
                                    {send_mail && <h3 className="text-display text-white bg-dark">Successfully signed up, check your email for more on getting rewards</h3>}
                                    <div className="form-group">
                                        <input name="username" className="form-control" type="text" placeholder="enter username" onChange={this.onChange} value={username} required />
                                    </div>
                                    <div className="form-group">
                                        <input name="email" className="form-control" type="email" placeholder="enter your valid email address" onChange={this.onChange} value={email} required />
                                    </div>
                                    <div className="form-group">
                                        <input name="phone" className="form-control" type="number" placeholder="enter your valid phone number" onChange={this.onChange} value={phone} required/>
                                    </div>
                                    <div className="form-group">
                                        <input name="password" className="form-control" type="password" placeholder="enter your password" onChange={this.onChange} value={password} required/>
                                    </div>
                                    <div className="form-group">
                                        <input name="confirmPassword" className="form-control" type="password" placeholder="re-enter password to confirm" onChange={this.onChange} value={confirmPassword} required/>
                                    </div>
                                    <div className="form-group">
                                        <button className="form-control btn btn-success text-white" disabled={isInvalid} onClick={this.onSubmit}>Sign Up</button>
                                    </div>
                                    <div className="form-group">
                                        {error && <p className="text-muted text-red bg-white">{error.message}</p>}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <SignInFacebook/>
                            </div>
                        </div>
                    </div>
                </div>

            
        </div>
        )

    }
}

class SignInFacebookBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    onSubmit = event => {
        this.props.firebase
            .doSignInWithFacebook()
            .then(() => {
                this.setState({ ...INITIAL_DETAILS })
                history.push('/')
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    };
    render() {
        const { error } = this.state;
        return (
                <div className="col-lg-12">
                    <form onSubmit={this.onSubmit}>
                        <button className="btn btn-success" type="submit">Sign In with Facebook</button>
                        {error && <p>{error.message}</p>}
                    </form>
                    
                </div>
            
        );
    }
}

const SignUpTemplate = withRouter(withFirebase(SignUpHOC))
const SignInFacebook=withRouter(withFirebase(SignInFacebookBase))
export default SignUpPage;
export {SignUpTemplate,SignInFacebook};

