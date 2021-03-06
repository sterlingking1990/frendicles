import app  from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/functions'
import 'firebase/storage'
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
    app.initializeApp(config);
    //authentication
    this.auth = app.auth();
    //database
    this.db = app.database();

    this.fbdata = app.database;
    this.storage = app.storage();

    //functions
    //this.fbfnc=app;
    this.fbfnc = app.functions();

    //implemtn fb login
    // this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  //create user and save user data
  doCreateUserWithEmailAndPassword = (username, email, phone, password) => {
    return this.auth
      .createUserWithEmailAndPassword(email, password)

      .then(authUser => {
        return this.user(authUser.user.uid).set({
          username,
          email,
          phone,
          notification: "enabled",
          marketer:false
        });
      });
  };

  //send mail

  // doSendMail=()=>{
  //   const callable=this.function.httpsCallable("sendEmail")
  //   console.log(callable())
  //   return callable({text:'Sending email with react and node mailer',subject:'Hello React Nodemailer'}).then(console.log)
  // }

  doSignInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);

    // .then(response=>console.log(response))
    // .catch(error=>console.log(error))
  };

  //sign in with fb
  // doSignInWithFacebook = () =>
  //   this.auth.signInWithPopup(this.facebookProvider).then(socialAuthUser => {
  //       const {accessToken} = socialAuthUser
  //       fetch('https://graph.facebook.com/me?fields=email,name&access_token=' + accessToken)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         this.user(json.id).set({
  //           username: json.name,
  //           email: json.email,
  //           notification: "enabled"
  //         })
  //       })
  //     })

  doSignOut = () =>
    this.auth.signOut().then(() => {
      console.log(history);
      history.push("/");
      history.go(0);
    });

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  getAuthStatus = () => {
    return this.auth.onAuthStateChanged(authUser => {
      return authUser;
    });
  };

  //send mail of new offer

  sendEmail = (subject, offer_name, image, description) => {
    const callabale = this.fbfnc.httpsCallable("genericEmail");
    return callabale({
      subject: subject,
      offer_name: offer_name,
      image: image,
      description: description
    }).then(console.log);
  };

  //send email after redeeming reward

  sendEmailOnReward = (subject, email, offer_name, image, fun_cost) => {
    const callable = this.fbfnc.httpsCallable("emailOnReward");
    return callable({
      subject: subject,
      email: email,
      offer_name: offer_name,
      image: image,
      fun_cost: fun_cost
    }).then(console.log);
  };

  //send email after each reward
  sendEmailEachReward = (subject, email, offer_name, image, reward_amount) => {
    const callable = this.fbfnc.httpsCallable("emailEachReward");
    return callable({
      subject: subject,
      email: email,
      offer_name: offer_name,
      image: image,
      fun_cost: reward_amount
    }).then(console.log);
  };

  //send email to admin on user join offer

  sendEmailOnJoin = (subject, email,email_of_place_owner,phone,offer_name) => {
    const callable = this.fbfnc.httpsCallable("emailOnJoin");
    return callable({
      subject: subject,
      email: email,
      email_of_place_owner:email_of_place_owner,
      phone: phone,
      offer_name: offer_name
    }).then(console.log);
  };

  //send email to user on what next after joining an offer
  sendEmailToUserOnJoin = (subject,email,username,offer_name,user_who_owns_place_username,user_who_owns_place_phone) => {
    const callable = this.fbfnc.httpsCallable("emailToUserOnJoin");
    return callable({
      subject: subject,
      email: email,
      username:username,
      offer_name: offer_name,
      user_who_owns_place_username:user_who_owns_place_username,
      user_who_owns_place_phone:user_who_owns_place_phone
    }).then(console.log);
  };

  //define user API

  getCurrentTime = () => this.fbdata.ServerValue.TIMESTAMP;

  user = uid => this.db.ref(`users/${uid}`);

  //get all users
  users = () => this.db.ref("users");

  //hook api
  hook = uid => this.db.ref(`hooks/${uid}`);

  hooks = () => this.db.ref("hooks");

  //place api
  place = uid => this.db.ref(`places/${uid}`);

  places = () => this.db.ref("places");

  //join api
  joinPlace = uid => this.db.ref(`join-places/${uid}`);
  joinPlaces = () => this.db.ref("join-places");

  funSlot = uid => this.db.ref(`fun-slots/${uid}`);
  funSlotUpdate = (uid, place_id) =>
    this.db.ref(`fun-slots/${uid}/${place_id}`);
  funSlots = () => this.db.ref("fun-slots");
  funSlotUpdates = () => this.db.ref("fun-slots");

  funType = uid => this.db.ref(`fun-types/${uid}`);
  funTypes = () => this.db.ref("fun-types");

  funSetting = uid => this.db.ref(`fun-settings/${uid}`);
  funSettings = () => this.db.ref("fun-settings");

  ofatriAccount = uid => this.db.ref(`ofatri-accounts/${uid}`);
  ofatriAccounts = () => this.db.ref("ofatri-accounts");

  goalSetting = uid => this.db.ref(`goal-settings/${uid}`);
  goalSettings = () => this.db.ref("goal-settings");

  adminGoalSetting = uid => this.db.ref(`admin-goal-settings/${uid}`);
  adminGoalSettings = () => this.db.ref("admin-goal-settings");

  //image store
  //single image
  imageStore = image_name => this.storage.ref(`images/${image_name}`);
  //all images
  imageStores = () => this.storage.ref("images");
}

export default Firebase