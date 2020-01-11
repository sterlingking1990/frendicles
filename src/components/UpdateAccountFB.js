import React from 'react'
import {withFirebase} from '../firebase';


const INITIAL_DETAILS={
    email:'',
    balance:'',
    account_details:[],
    saveStatus:false,
    loading_accounts:false,
    error:false,
}
class UpdateAccountFB extends React.Component{
    constructor(props){
        super(props);

        this.state={...INITIAL_DETAILS}

    }

    componentDidMount(){
        this.props.firebase.ofatriAccounts().on('value',snapShot=>{
            const accountObj=snapShot.val()
            if(accountObj){
                const accountArr = Object.keys(accountObj).map(key => ({
                    ...accountObj[key], uid: key
                }))
                this.setState({ ...INITIAL_DETAILS,account_details: accountArr, loading_accounts: true })
            }
            else{
                this.setState({...INITIAL_DETAILS,error:true,account_details:[]})

            }
            
        })
    }

    saveDetails=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    saveOfatriAccount=event=>{
        const {email,balance}=this.state
        this.props.firebase.ofatriAccounts().push({
            email,
            balance,
        })
        this.props.firebase.ofatriAccounts().on('value', snapShot => {
            const accountObj = snapShot.val()
            if (accountObj) {
                const accountArr = Object.keys(accountObj).map(key => ({
                    ...accountObj[key], uid: key
                }))
                this.setState({ ...INITIAL_DETAILS, account_details: accountArr, loading_accounts: true })
            }
            else {
                this.setState({ ...INITIAL_DETAILS, error: true, account_details: [] })

            }

        })
  

        event.preventDefault();
    }

    deleteAccount=uid=>{
        this.props.firebase.ofatriAccount(uid).remove()
    }

    updateAccount=(email,balance,uid)=>{
        this.props.firebase.ofatriAccount(uid).set({
            email,
            balance,
        })

    }

    render(){
        const {email,balance,account_details,error}=this.state;
        return(
            <div id="update-transaction">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            <div className="card bg-dark">
                                <h3 className="card-title text-center">PARTNER OFATRI ACCOUNT</h3>
                                <div className="card-body">
                                    <div className="form-group">
                                        <input name="email" type="text" value={email} className="form-control" placeholder="enter partner email" onChange={this.saveDetails}/>
                                    </div>
                                    <div className="form-group">
                                        <input name="balance" type="number"  value={balance} className="form-control" placeholder="enter amount" onChange={this.saveDetails}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="form-control btn-success" onClick={this.saveOfatriAccount}>SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            <div className="card bg-dark">
                                <h3 className="card-title text-center text-white">Ofatri Accounts</h3>
                            </div>
                        </div>
                    </div>
                    {account_details.length>0 ? <OfatriAccounts accounts={account_details} updateAccount={this.updateAccount} deleteAccount={this.deleteAccount} /> :<div className="row"><div className="col-lg-12 sm-12"><p className="display-4 text-center">No Account History or Subscribers Yet</p></div></div>}                    
                </div>
            </div>
        )
    }
}

const OfatriAccounts=({accounts,updateAccount,deleteAccount})=>{
    return (
        <div>
        {accounts.map(account=><AccountTemplate key={account.uid} account_id={account.uid} account={account} updateAccount={updateAccount} deleteAccount={deleteAccount}/>)}
        </div>
    )
}

class AccountTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={editStatus:false,deleteStatus:false,email:this.props.account.email,balance:this.props.account.balance,account_id:this.props.account_id}

    }

    readyEditAccount=()=>{
        this.setState({editStatus:true})
    }

    onChange=event=>{
        this.setState({[event.target.name]:event.target.value})
    }

    updateAccount=()=>{
        const {email,balance,account_id}=this.state
        this.props.updateAccount(email,balance,account_id);
        this.setState({editStatus:false})
    }

    resetAccount=()=>{
        this.setState({email:this.props.account.email,balance:this.props.account.balance})
        this.setState({editStatus:false})
    }

    render(){
        const {editStatus,email,balance,account_id}=this.state;
        return(
            <div>
            
            {editStatus ? 
                <div className="row my-2">
                    <div className="col-lg-12 sm-12">

                        <div className="form-group">
                            <input name="email" className="form-control" value={email} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <input name="balance" className="form-control" value={balance} onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <button className="form-control btn-success" onClick={this.updateAccount}>Update Account</button> 
                        </div>
                        <div className="form-group">
                            <button className="form-control btn-dark" onClick={this.resetAccount}>Reset to Default</button> 
                        </div>
                    </div>
                </div> :
                
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <div className="card bg-dark my-2">
                            <span className="text-right"><i className="fa fa-edit mx-1" onClick={this.readyEditAccount}></i><i className="fa fa-remove mx-1" onClick={()=>this.props.deleteAccount(account_id)}></i></span>
                            <h3 className="card-title text-center text-white">{email}</h3>
                            <div className="card-body">
                                <h3 className="text-center display-4">{balance}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
                
        )
    }
}

export default withFirebase(UpdateAccountFB)