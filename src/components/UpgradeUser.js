import React from "react";
import { withFirebase } from "../firebase";

const INITIAL_DETAILS = {
  users: [],
  untouchedUsers:[],
  loading_accounts: false,
  error: false,
  searchedEmail:'',
};
class UpgradeUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_DETAILS };
  }

  componentDidMount() {
    this.props.firebase.users().on("value", snapShot => {
      const accountObj = snapShot.val();
      const accountArr = Object.keys(accountObj).map(key => ({
          ...accountObj[key],
          uid: key
        }));
        this.setState({users:accountArr,untouchedUsers:accountArr });
    });
  }

  upgradeAccount = (uid,marketer_stat) => {
      if(marketer_stat===true){
          this.props.firebase.user(uid).update({
            marketer: false
          });
      }
      else{
        this.props.firebase.user(uid).update({
        marketer:true
        });
        }
  };

  setEmailToSearch=event=>{
      const emailToSearch=event.target.value
      this.setState({searchedEmail:emailToSearch})
      const {users,searchedEmail}=this.state
      const user_searched=users.filter(user=>user.email.includes(searchedEmail))
      if(emailToSearch===""){
          this.setState({ users: users });
      }
      else{
      this.setState({users:user_searched})
      }
  }

  refreshUser=()=>{
      const untouchedUsers=this.state.untouchedUsers
      this.setState({users:untouchedUsers})
  }

  render() {
    const {users,searchedEmail} = this.state;
    const num_marketers=users.filter(user=>user.marketer===true)
    
    return (
      <div id="update-transaction">
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
          </div>
        </div>

        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-12 sm-12">
              <div className="card bg-dark">
                <h3 className="card-title text-center text-white">
                  <span>Ofatri Users Upgrade:</span><span className="mx-2">{num_marketers.length} marketers</span><span className="mx-2">{users.length-num_marketers.length} non-maketers</span>
                </h3>
              </div>
                <div className="card-body">
                  <div className="form-group">
                  <span className="text-left">
                    <input className="form-control" placeholder="enter email to search for user" value={searchedEmail} onChange={(e)=>this.setEmailToSearch(e)}/></span>
                    <span><i className="fa fa-refresh mx-3" onClick={this.refreshUser}></i></span>
                </div>
                </div>
            </div>
          </div>
          {users.length > 0 ? (
            <UsersAccounts
              accounts={users}
              upgradeAccount={this.upgradeAccount}
            />
          ) : (
            <div className="row">
              <div className="col-lg-12 sm-12">
                <p className="display-4 text-center">
                  No Account History or Subscribers Yet
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const UsersAccounts = ({accounts,upgradeAccount}) => {
  return (
    <div>
      {accounts.map(account => (
        <AccountTemplate
          key={account.uid}
          account_id={account.uid}
          account={account}
          upgradeAccount={upgradeAccount}
        />
      ))}
    </div>
  );
};

class AccountTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.account.email,
      account_id: this.props.account_id,
    };
  }


  upgradeAccount = (account_id,marketer_stat) => {
    this.props.upgradeAccount(account_id,marketer_stat);
  };


  render() {
    const {email,account_id} = this.state;
    if(this.props.account.marketer){
        if(this.props.account.marketer===true){
            var isMarketer=true
        }
        else{
            var isMarketer=false
        }
    }
    else{
        var isMarketer=false
    }
    
    
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 sm-12">
            <div className="card bg-dark my-2">
                {isMarketer? <p className="text-display text-center" style={{color:"red"}}>User is now a Marketer</p>:<p className="text-display text-white text-center">User is not a Marketer</p>}
              <span className="mx-4 text-left">
                <button className="btn btn-primary" onClick={()=>this.upgradeAccount(account_id,isMarketer)}>
                  {isMarketer? (
                    <i className="fa fa-unlock"></i>
                  ) : (
                    <i className="fa fa-lock"></i>
                  )}
                </button>
              </span>
              <div className="card-body">
               <p className="text-display text-center text-white">{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(UpgradeUser);
