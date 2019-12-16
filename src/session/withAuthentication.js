import React from 'react';
import {withFirebase} from '../firebase'
import AuthUserContext from './context'

const withAuthentication = Component=>{
    class withAuthentication extends React.Component{
        constructor(props){
            super(props);
            this.state={
                authUser:null,
            }
        }

        componentDidMount() {
            this.props.firebase.auth.onAuthStateChanged(authUser => {
                authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
            });
        }

        render(){
            return (
            <AuthUserContext.Provider value={this.state.authUser}>
            <Component {...this.props} />
            </AuthUserContext.Provider>
            )

        }
    }
    return withFirebase(withAuthentication)
};
export default withAuthentication