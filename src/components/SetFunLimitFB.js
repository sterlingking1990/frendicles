import React from 'react'
import { withFirebase } from '../firebase'
import { AuthUserContext } from '../session';
import { setTimeout } from 'timers';

class SetFunLimitFB extends React.Component{
    constructor(props){
        super(props);
        this.state={start_amount:0,end_amount:0,fun_amount:0,savedSettings:false}
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    saveFunSetting=(e,authUser)=>{
        const start_amount=this.state.start_amount
        const end_amount=this.state.end_amount
        const fun_amount=this.state.fun_amount

        this.props.firebase.funSettings().push({
            start_amount,
            end_amount,
            fun_amount,
            userId:authUser.uid,
        })

        this.setState({savedSettings:true})

        setTimeout(function(){
            this.setState({savedSettings:false});
        }.bind(this),2000)

        e.preventDefault()

    }

    render(){
        const {start_amount,end_amount,fun_amount, savedSettings}=this.state

        return(
            <AuthUserContext>
                {authUser => (
            <div id="set_fun_limit">
                
                    <div className="container mt-3">
                        {savedSettings && <p className="text-display text-center text-white bg-dark">Saved successfully, add more!</p>}
                        <div className="row">
                            <div className="col-lg-4 sm-12">
                                <div className="form-group">
                                    <input name="start_amount" value={start_amount} className="form-control" type="number" placeholder="transaction from (10000)" onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="col-lg-4 sm-12">
                                <div className="form-group">
                                    <input name="end_amount" value={end_amount} className="form-control" type="number"  placeholder="to (20000)" onChange={this.onChange}/>
                                </div>
                            </div>
                            <div className="col-lg-4 sm-12">
                                <div className="form-group">
                                    <input name="fun_amount" className="form-control" type="number" placeholder="amount to give-away/funbees (500)" onChange={this.onChange} value={fun_amount}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 sm-12">
                                <div className="form-group">
                                    <button className="form-control bg-dark text-white" onClick={(e)=>this.saveFunSetting(e,authUser)}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
               
                </div>
                )}
            </AuthUserContext>
        )
    }
}

export default withFirebase(SetFunLimitFB)