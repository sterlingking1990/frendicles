import React from 'react';
import { withFirebase } from '../firebase';
const SignOutUser = ({ firebase }) => (
    <button className="btn-dark btn-small" type="button" onClick={firebase.doSignOut}>
        Sign Out
  </button>
);
export default withFirebase(SignOutUser);