import React from 'react'
import { withFirebase } from '../firebase'
import { Link } from 'react-router-dom'

const PasswordRecoveryPage=()=>(
    <div id="password-forget">
        <h1 className="display-4">Recover Password</h1>
        <PasswordRecoveryForm/>
    </div>
)

const INITIAL_DETAILS={
    email:'',
    error:null,
};

class PasswordRecoveryHOC extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_DETAILS}
    }

    recoverPassword=event=>{
        const {email} = this.state
        this.props.firebase.doPasswordReset(email)
        .then(()=>{
            this.setState({...INITIAL_DETAILS})
        })
        .catch(error=>{
            this.setState({error})
        })
        event.preventDefault();
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    render(){
        const {email,error}=this.state
        const isInvalid=email===''
        return(
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <div className="form-group">
                            <input name="email" type="email" placeholder="email address" className="form-control" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <button disabled={isInvalid} type="submit" className="form-control" onClick={this.recoverPassword}>Recover Password</button>
                        </div>
                        <div className="form-group">
                            {error && <p className="text-red bg-white">{error.message}</p>}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const PasswordRecoveryLink=()=>(
    <div className="container mt-3">
        <div className="row">
            <div className="col-lg-12 sm-12">
                <Link to="/recover-password">Recover Password</Link>
            </div>
        </div>
    </div>
)

export default PasswordRecoveryPage

const PasswordRecoveryForm=withFirebase(PasswordRecoveryHOC)

export {PasswordRecoveryForm,PasswordRecoveryLink}
