import app  from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyDs12yK7z48Az_Syv7ePfWhcrKwNHDtH78",
  authDomain: "friendicle-app.firebaseapp.com",
  databaseURL: "https://friendicle-app.firebaseio.com",
  projectId: "friendicle-app",
  storageBucket: "friendicle-app.appspot.com",
  messagingSenderId: "1056235765811",
  appId: "1:1056235765811:web:3f8333d0b110159ae6e346"
};
// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth=app.auth();
    //database
    this.db=app.database();
  }

//create user and save user data 
  doCreateUserWithEmailAndPassword=(username,email,password)=>{
    return this.auth
    .createUserWithEmailAndPassword(email,password)

      .then(authUser => {
        return this
        .user(authUser.user.uid)
        .set({
          username,
          email,
        })
      })
      .catch(err => console.log(err));
  }

  doSignInWithEmailAndPassword=(email,password)=>{
    return this.auth
    .signInWithEmailAndPassword(email,password)

    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  }
  
  doSignOut=()=>this.auth.signOut()

  doPasswordReset = email=>this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate= password => this.auth.currentUser.updatePassword(password)
  
  
//define user API


user=uid=>this.db.ref(`users/${uid}`)

//get all users
users=()=>this.db.ref('users')

//hook api
hook=uid=>this.db.ref(`hooks/${uid}`)

hooks=()=>this.db.ref('hooks')

//place api
place=uid=>this.db.ref(`places/${uid}`)

places=()=>this.db.ref('places')

//join api
joinPlace=uid=>this.db.ref(`join-places/${uid}`)
joinPlaces=()=> this.db.ref('join-places')
}





export default Firebase