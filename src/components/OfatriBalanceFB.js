import React from 'react';
import {withFirebase} from '../firebase'

class OfatriBalance extends React.Component{
    constructor(props){
        super(props);
        this.state={account_balance:null,user_email:'',loading:false}
    }
    
    componentDidMount(){
        this.setState({loading:true})
        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            this.props.firebase.ofatriAccounts().on('value',snapShot=>{
                const ofatriAccountObj=snapShot.val()
                if(ofatriAccountObj){
                    const ofatriAccountArr = Object.keys(ofatriAccountObj).map(key=>({
                        ...ofatriAccountObj[key], uid: key
                    }))
                    const current_user_account = ofatriAccountArr.filter(account => account.email === authUser.email)
                    this.setState({ account_balance: current_user_account[0].balance })
                    this.setState({loading:false})
                }
                else{
                    this.setState({account_balance:null,user_email:authUser.email,loading:false})
                }
                
            })
        })
    }

    refreshAccount=()=>{
        const {user_email}=this.state
        this.props.firebase.ofatriAccounts().on('value', snapShot => {
            const ofatriAccountObj = snapShot.val()
            if (ofatriAccountObj) {
                const ofatriAccountArr = Object.keys(ofatriAccountObj).map(key=>({
                    ...ofatriAccountObj[key], uid: key
                }))
                const current_user_account = ofatriAccountArr.filter(account => account.email === user_email)
                this.setState({ account_balance: current_user_account[0].balance })
            }
            else {
                this.setState({ account_balance: null })
            }

        })
    }
    
    render(){
        const {account_balance,loading}=this.state
        return(
            <div>
            {loading && <div id="ofatri-balance"><p className="display-4 text-center">loading account details...</p></div>}
            {account_balance===null? <div id="ofatri-balance"><p className="display-4 text-center">Your Account has not been updated Yet</p></div>:
                <div id="ofatri-balance">
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-lg-12 sm-12">
                                <div className="card bg-dark">
                                    <h3 className="card-title text-center text-white">Ofatri Balance</h3>
                                    <div className="card-body">
                                        <h3 className="display-4 text-center text-white">{account_balance}</h3>
                                        <div className="form-group">
                                            <button className="form-control btn-success" onClick={()=>this.refreshAccount}>Refresh</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

export default withFirebase(OfatriBalance)