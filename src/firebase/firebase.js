import app  from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import {history} from '../routers/AppRouter'
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
    //authentication
    this.auth=app.auth();
    //database
    this.db=app.database();

    this.fbdata=app.database;
    
    //functions
    // this.function=app.functions();
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
  }

  //send mail

  // doSendMail=()=>{
  //   const callable=this.function.httpsCallable("sendEmail")
  //   console.log(callable())
  //   return callable({text:'Sending email with react and node mailer',subject:'Hello React Nodemailer'}).then(console.log)
  // }

  doSignInWithEmailAndPassword=(email,password)=>{
    return this.auth
    .signInWithEmailAndPassword(email,password)

    // .then(response=>console.log(response))
    // .catch(error=>console.log(error))
  }
  
  doSignOut = () => this.auth.signOut().then(() => {
    history.push('/')
  })

  doPasswordReset = email=>this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate= password => this.auth.currentUser.updatePassword(password)

  getAuthStatus=()=>{
    return this.auth
      .onAuthStateChanged(authUser=>{
        return authUser
      })
  }
  
  
//define user API

getCurrentTime=()=>this.fbdata.ServerValue.TIMESTAMP;


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

funSlot=uid=>this.db.ref(`fun-slots/${uid}`)
funSlots=()=>this.db.ref('fun-slots')

funType=uid=>this.db.ref(`fun-types/${uid}`)
funTypes=()=>this.db.ref('fun-types')

funSetting = uid => this.db.ref(`fun-settings/${uid}`)
funSettings = () => this.db.ref('fun-settings')

ofatriAccount = uid =>this.db.ref(`ofatri-accounts/${uid}`)
ofatriAccounts = () => this.db.ref('ofatri-accounts')

goalSetting = uid =>this.db.ref(`goal-settings/${uid}`)
goalSettings = () =>this.db.ref('goal-settings')

adminGoalSetting=uid=>this.db.ref(`admin-goal-settings/${uid}`)
adminGoalSettings=()=>this.db.ref('admin-goal-settings')

}

export default Firebase