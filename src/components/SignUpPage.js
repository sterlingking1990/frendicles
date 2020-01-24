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
        const { username,email, password } = this.state;
        
      this.props.firebase
      .doCreateUserWithEmailAndPassword(username,email, password)
      .then(()=>{
          this.setState({ ...INITIAL_DETAILS,send_mail:true}); 
          //set time out before redirecting to home page---after 2000 secs, then redirect...by then you must have used the send mail(true) to notify user that email
          //has been sent to his mail, please check your mail to know about best tips to win rewards...
          setTimeout(function(){
            this.setState({send_mail:false})
            history.push('/')
          }.bind(this), 2000);
                 
      })
      .catch(error => {
        this.setState({ ...INITIAL_DETAILS,error:error });
      });
   
    event.preventDefault();
  }

    render() {
        const {
            username,
            email,
            password,
            confirmPassword,
            error,
            send_mail,
        } = this.state;

        const isInvalid = password !== confirmPassword || password === '' || email === '' || username ==='';

        return (

            <div className="signup">
                <div className="signup-section">
                    <div className="signup-banner">

                    </div>
                    <div className="signup-banner-text">
                        <h3>Welcome to Ofatri a platform that rewards you for every penny you spend on transactions.</h3>
                        <span><strong>SignUp to begin </strong></span>
                    </div>
                </div>

            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                            {error && <h3 className="text-display text-white bg-dark">Could not sign you up, check that your email is valid and network is fine</h3> }
                        {send_mail && <h3 className="text-display text-white bg-dark">Successfully signed up, check your email for more on getting rewards</h3>}
                        <div className="form-group">
                            <input name="username" className="form-control" type="text" placeholder="enter username" onChange={this.onChange} value={username} />
                        </div>
                        <div className="form-group">
                            <input name="email" className="form-control" type="email" placeholder="enter your valid email address" onChange={this.onChange} value={email} />
                        </div>
                        <div className="form-group">
                            <input name="password" className="form-control" type="password" placeholder="enter your password" onChange={this.onChange} value={password} />
                        </div>
                        <div className="form-group">
                            <input name="confirmPassword" className="form-control" type="password" placeholder="re-enter password to confirm" onChange={this.onChange} value={confirmPassword} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn-success text-white" disabled={isInvalid} onClick={this.onSubmit}>Sign Up</button>
                        </div>
                        <div className="form-group">
                            {error && <p className="text-muted text-red bg-white">{error.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )

    }
}

const SignUpTemplate = withRouter(withFirebase(SignUpHOC))
export default SignUpPage;
export {SignUpTemplate};

