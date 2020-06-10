import React from 'react'


const INITIAL_DETAILS={
    new_password:'',
    confirm_password:'',
    error:null,
    passwordChanged:false,
}

class ChangePasswordPage extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_DETAILS}
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    changePassword=event=>{
        const {new_password} = this.state

        this.props.firebase.doPasswordUpdate(new_password)
        .then(()=>{
            this.setState({...INITIAL_DETAILS,passwordChanged:true})
        })
        .catch(error=>{
            this.setState({error})
        })
        event.preventDefault()
    }

    render(){
        const {
            new_password,
            confirm_password,
            error,
            passwordChanged
        } = this.state;

        const isInvalid = confirm_password !== new_password || confirm_password === '';

        return(
            <div id="change-password">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                            {passwordChanged && 
                            <div className="card bg-dark">
                                <div className="card-body">
                                    <p className="text-display text-center text-white">Password has been changed successfully click <a href="http://ofatri.com/#/signin">here</a> to sign in</p>
                                </div>
                            </div>}
                    <div className="form-group">
                        <input name="new_password" className="form-control" type="password" placeholder="enter new password" onChange={this.onChange} value={new_password} />
                    </div>
                    <div className="form-group">
                        <input name="confirm_Password" className="form-control" type="password" placeholder="confirm password" onChange={this.onChange} value={confirm_password} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="form-control btn-success text-white" disabled={isInvalid} onClick={this.changePassword}>Reset Password</button>
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

export default ChangePasswordPage