import React from 'react';
import {withFirebase} from '../firebase'
import AuthUserContext from './context'

const withAuthentication = Component=>{
    class withAuthentication extends React.Component{
        constructor(props){
            super(props);
            this.state={
                authUser:null,
                users:[]
            }
        }

        componentDidMount() {
            this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({ authUser }) : this.setState({ authUser: null })

                this.props.firebase.users().on("value", snapShot => {
                  const userObj = snapShot.val();
                  if(userObj){
                  const userArr = Object.keys(userObj).map(key => ({
                    ...userObj[key],uid:key
                  }))
                  console.log(userArr)
                  this.setState({ users: userArr });
                }
                });
            });
            
        }

        render(){
            return (
            <AuthUserContext.Provider value={{authState:this.state.authUser,users:this.state.users}}>
            <Component {...this.props} />
            </AuthUserContext.Provider>
            )
        }
    }
    return withFirebase(withAuthentication)
};
export default withAuthentication