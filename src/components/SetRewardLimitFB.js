import React from 'react'
import { withFirebase } from '../firebase'
import { AuthUserContext } from '../session';
import { setTimeout } from 'timers';

class SetRewardLimitFB extends React.Component{
    constructor(props){
        super(props);
        this.state={start_amount:'',end_amount:'',fun_amount:'',savedSettings:false,user_settings:[],user_id:''}
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser=>{

            this.props.firebase.funSettings().on('value',snapShot=>{
                const userFunSettingsObj=snapShot.val();
                if(userFunSettingsObj){
                    const userFunSettingsArr=Object.keys(userFunSettingsObj).map(key=>({
                        ...userFunSettingsObj[key],uid:key
                }))

                
                    const user_settings=userFunSettingsArr.filter(fun_settings=>fun_settings.userId===authUser.uid)
                
                    this.setState({user_settings:user_settings})
                   
                }  
                else{
                    this.setState({user_settings:[]})
                }
            })
        })
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

    onRemoveSetting=uid=>{
        this.props.firebase.funSettings(uid).remove();
        const new_settings_detail = this.state.user_settings.filter((setting) => setting.uid !== uid)
        if (new_settings_detail.length > 0) {
            this.setState({ user_settings: new_settings_detail })
        }
        else {
            this.setState({user_settings: []})
        }
    }

    render(){
        const {start_amount,end_amount,fun_amount,savedSettings,user_settings}=this.state
        

        return(
            <AuthUserContext>
                {authUser => (
            <div id="set_fun_limit">
                        <div className="banner-body-background">
                            <div className="banner-body-text1">
                                <span className="logo-name" id="app-name">ofatri</span>
                                <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                                
                            </div>
                        </div>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-12 sm-12">
                            
                                    {savedSettings && <p className="text-display text-center text-white bg-dark">Saved successfully, add more!</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 sm-12">    
                                    <div className="form-group">
                                        <input name="start_amount" value={start_amount} className="form-control" type="number" placeholder="transaction from (10000)" onChange={this.onChange} />
                                    </div>
                                </div>
                            <div className="col-lg-4 sm-12">
                                    <div className="form-group">
                                        <input name="end_amount" value={end_amount} className="form-control" type="number" placeholder="to (20000)" onChange={this.onChange} />
                                    </div>
                                </div>
                            <div className="col-lg-4 sm-12">
                                    <div className="form-group">
                                        <input name="fun_amount" className="form-control" type="number" placeholder="rate in percent for transaction i.e (10) for 10 percent" onChange={this.onChange} value={fun_amount} maxLength={3}/>
                                    </div>
                                </div>
                        </div>
                        <div className="row">
                                <div className="col-lg-12 sm-12">
                                    <div className="form-group">
                                        <button className="form-control bg-dark text-white" onClick={(e) => this.saveFunSetting(e, authUser)}>Save</button>
                                    </div>
                                </div>
                        </div>
                    </div>

                    <div className="container mt-3">
                            {/* {(() => {
                                for (let i = 0; i < user_settings.length; i++) {
                                    return (
                                        <div>
                                            <h5 className="text-display text-center bg-dark text-white">From - {user_settings[i].start_amount}</h5>
                                            <h5 className="text-display text-center text-white">To - {user_settings[i].end_amount}</h5>
                                            <h5 className="text-display text-center text-white">Rate(%) -  {user_settings[i].fun_amount}</h5>
                                        </div>
                                    )
                                }
                            })}     */}
                        <UserSettings user_settings={user_settings} onRemoveSetting={this.onRemoveSetting}/>
                    </div>
                </div> 
                )}
            </AuthUserContext>
        )
    }
}

const UserSettings = ({ user_settings, onRemoveSetting }) => (
    <div>
        {user_settings.map(user_setting =>(
            <SettingTemplate key={user_setting.uid} user_settings={user_settings} user_setting={user_setting} onRemoveSetting={onRemoveSetting} />
            
        ))}
    </div>
)

class SettingTemplate extends React.Component {
    constructor(props) {
        super(props);
    
    }


    render() {


        return (

            <div className="card bg-dark" id="show_transaction_history">
                <div className="card-title">
                    <span className="text-right text-sm text-display"><i className="fa fa-remove mx-2 text-red" onClick={(() => this.props.onRemoveSetting(this.props.user_setting.uid))}></i></span>
                    <div className="card-body">
                       
                                   <div>
                                       <h5 className="text-display text-center bg-dark text-white">From - {this.props.user_setting.start_amount}</h5>
                                       <h5 className="text-display text-center text-white">To - {this.props.user_setting.end_amount}</h5>
                                       <h5 className="text-display text-center text-white">Rate(%) -  {this.props.user_setting.fun_amount}</h5>
                                   </div>
                              
                    </div>

                </div>
            </div>
        )
    }
}


export default withFirebase(SetRewardLimitFB)