import React,{Component} from 'react'
import {withFirebase} from '../firebase'
import {withRouter} from 'react-router-dom'
import {history} from '../routers/AppRouter'

const SignUpPage=()=>(
    <div id="sign-up">
        <SignUpTemplate/>
    </div>

)

const INITIAL_DETAILS = {
    username:'',
    email: '',
    password: '',
    confirmPassword: '',
    error: null,

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
          this.setState({ ...INITIAL_DETAILS }); 
          history.push('/')       
      })
      .catch(error => {
        this.setState({ ...INITIAL_DETAILS,error });
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
        } = this.state;

        const isInvalid = password !== confirmPassword || password === '' || email === '' || username ==='';

        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
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
        )

    }
}

const SignUpTemplate = withRouter(withFirebase(SignUpHOC))
export default SignUpPage;
export {SignUpTemplate};

