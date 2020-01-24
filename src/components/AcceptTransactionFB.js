import React from 'react'
import { withFirebase, FirebaseContext } from '../firebase'
import { setTimeout } from 'timers';
import { AuthUserContext } from '../session';


const INITIAL_DETAILS={
    transaction_amount: 0, 
    transaction_processed: [], 
    loading_transactions: true, 
    funbees_won: null, 
    fun_settings: [], 
    fun_types:[],
    transaction_completed: false, 
    verified: false, 
    users: [], 
    places: [], 
    joinedPlaces: [], 
    user_id: '', 
    place_id: '', 
    user_verified: null, 
    place_verified: null, 
    token: '', 
    error_verification: false, 
    error_fetching_fun_settings: false,
    error_fetching_fun_types:false,
}
class AcceptTransactionFB extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_DETAILS}
        this.verifyToken=this.verifyToken.bind(this);
    }

    componentDidMount(){
            //get all the join places and the verify if the user token exist among them, and the name of the user who is verified and ready for transaction
            
            this.props.firebase.joinPlaces().on("value",snapShot=>{
                const joinedPlaces=snapShot.val()
                if(joinedPlaces){
                    const joinedObject=Object.keys(joinedPlaces).map(key=>({
                        ...joinedPlaces[key],uid:key
                    }))
                    this.setState({joinedPlaces:joinedObject})
                }


            })

            this.props.firebase.users().on('value',snapShotUsers=>{
                const usersObject=snapShotUsers.val()
                if(usersObject){
                    const usersArray=Object.keys(usersObject).map(key=>({
                        ...usersObject[key],uid:key
                    }))
                    this.setState({users:usersArray})

                }
            })

            this.props.firebase.places().on('value',snapShotPlace=>{
                const placeObject=snapShotPlace.val()
                if(placeObject){
                    const placeArray=Object.keys(placeObject).map(key=>({
                        ...placeObject,uid:key
                    }))
                    this.setState({places:placeArray})
                }

            })

            //get the lists of transactions completed by this user
            this.props.firebase.auth.onAuthStateChanged(authUser=>{
                this.props.firebase.funSlots().orderByChild('transaction_by').equalTo(authUser.uid).on('value',snapShot=>{
                    const transactionObject=snapShot.val()
                    if(transactionObject){
                    const transactionArr=Object.keys(transactionObject).map(key=>({
                        ...transactionObject[key],uid:key
                    }))
                    this.setState({transaction_processed:transactionArr,loading_transactions:false})
                }
                else{
                    this.setState({loading_transactions:false})
                }
                })
            })
    }

    setToken=event=>{
        const token = event.target.value
        this.setState({ token })
    }

    saveTransactionAmount=event=>{
        const transaction_amount=event.target.value
        this.setState({transaction_amount})
    }

    verifyToken=event=>{
        
        const joinedPlaces=this.state.joinedPlaces
        const place_token=this.state.token

        var isTokenInPlaces=[]

        for (let i = 0; i < joinedPlaces.length; i++) {
                isTokenInPlaces.push(joinedPlaces[i].token===place_token)
            if(joinedPlaces[i].token===place_token){

                const user_joined_detail = this.state.users.filter(user => user.uid ===joinedPlaces[i].userId)
                const place_joined_detail = this.state.places.filter(place => place.uid === joinedPlaces[i].place_id)
                this.setState({user_verified:user_joined_detail[0].username})
                this.setState({place_verified:place_joined_detail[0][joinedPlaces[i].place_id].place_name})
                this.setState({user_id:user_joined_detail[0].uid})
                this.setState({place_id:place_joined_detail[0].uid})
                
            }
            //consider adding break so that it doesnt try to look for another scenerio where the token exist twice in the joined
        }

        if(isTokenInPlaces.some(t=>t===true)){

            this.setState({verified:true})
            this.setState({error_verification:false})
            //use the user_id to get te name of the 
        }
        else{
            this.setState({error_verification:true,verified:false})
        }
    
        event.preventDefault()
    }

    processFunbees=(e,authUser)=>{
        const {user_id,place_id,transaction_amount}=this.state
            this.props.firebase.funSettings().orderByChild('userId').equalTo(authUser.uid).on('value',snapShotSettings=>{
                if(snapShotSettings.val()){
                const funSettingsObject=snapShotSettings.val()
                const funSettingsArr=Object.keys(funSettingsObject).map(key=>({
                    ...funSettingsObject[key],uid:key
                }))

                
                    const funbee_amount = funSettingsArr.filter(funSetting => parseInt(transaction_amount) > parseInt(funSetting.start_amount) && parseInt(transaction_amount) < parseInt(funSetting.end_amount));

                this.setState({fun_settings:funbee_amount})
                    var funbees_amount = parseInt((this.state.fun_settings[0].fun_amount/100)*parseInt(transaction_amount));
                    const funbees_won=funbees_amount/2;  //divide the amount by 2 to get the amount user will get for his reward. the amin amount is the one the agent gets for procurring the customer
                    this.setState({ funbees_won: funbees_won })

                    //get details of the kind of fun to be processed i.e swimming is fun_unit 300n, beer 500n, so if the user fun amount is 1000, these type of fun
                    //will display so the user can now test his creative choice that adds up to the fun amount and then friendicle will process the location and make
                    //necessary arrangement for the customer to have such fun

                    //save the details now in the funSlot record
            }
                else {
                    this.setState({ error_fetching_fun_settings: true })

                }
            })

            //deciding the fun types from the transaction amount and finally storing the fun 
            this.props.firebase.funTypes().orderByChild('userId').equalTo(authUser.uid).on('value',snapShot=>{
                const funTypesObject=snapShot.val()
                if(funTypesObject){
                    const funTypeArr=Object.keys(funTypesObject).map(key=>({
                        ...funTypesObject[key],uid:key
                    }))
                    this.setState({fun_types:funTypeArr})

                    var fun_types = this.state.fun_types
                    const funbees = this.state.funbees_won
                    var fun_types_offered=[]
                    for(let i = 0; i< fun_types.length;i++){
                        if(parseInt(fun_types[i].unit_cost)<=parseInt(funbees)){
                            const fun={
                                fun_type:fun_types[i].fun_type,
                                unit_cost:fun_types[i].unit_cost,
                            }
                            fun_types_offered.push({
                                ...fun
                            })
                        }
                    }

                    this.props.firebase.funSlots().push({
                        user_id,
                        place_id,
                        transaction_amount,
                        funbees,
                        fun_types_offered:fun_types_offered,
                        transaction_by: authUser.uid,
                    })

                    this.setState({ transaction_completed: true })

                    setTimeout(function () {
                        this.setState({ transaction_completed: false })
                    }.bind(this), 3000)

                }
                else{
                    this.setState({error_fetching_fun_types:true})
                }
            })
        e.preventDefault()
    }

    onRemoveTransaction=uid=>{
        this.props.firebase.funSlot(uid).remove()
        const new_transaction_details=this.state.transaction_processed.filter((transaction)=>transaction.uid !== uid)
        if(new_transaction_details.length>0){
        this.setState({transaction_processed:new_transaction_details})
        }
        else{
            this.setState({loading_transactions:false,transaction_processed:[]})
        }
    }

    render(){
        const {verified,token,error_verification,user_verified,place_verified,transaction_completed,funbees_won,error_fetching_fun_settings,transaction_processed,transaction_amount,loading_transactions,error_fetching_fun_types}=this.state

        return(
            <div id="accept_transaction">
            <AuthUserContext>
                {authUser=>(
                        <div className="container mt-3">
                            <div class="row">
                                <div className="col-lg-12 sm-12">
                                    <div className="card">
                                        <p className="text-display text-center bg-dark text-white">Enter Token to Verify Transaction</p>
                                        <div classNmae="form-group">
                                            <input className="form-control my-2" type="text" onChange={this.setToken} value={token} />
                                        </div>
                                        <div className="form-group">
                                            <button className="form-control btn-success bg-dark" onClick={this.verifyToken}>Verify Token</button>
                                        </div>
                                        {verified &&
                                            <div>
                                                <p className="text-display text-center text-white bg-dark">you are processing transaction for {user_verified} about {place_verified} offer</p>
                                                <div className="form-group">
                                                    <p className="text-display text-center bg-dark text-white">Enter amount for transaction</p>
                                                    <input className="form-control" type="text" onChange={this.saveTransactionAmount} />
                                                </div>
                                                <div className="form-group">
                                                    <button className="form-control btn-success bg-dark" onClick={(e)=>this.processFunbees(e,authUser)}>Save transaction</button>
                                                </div>
                                            </div>
                                        }
                                        {error_verification && <h3 className="text-display text-center bg-dark text-white">Could not verify customer transaction token</h3>}
                                        {error_fetching_fun_settings && <h3 className="text-display text-center bg-dark text-white">Please set funbees settings for customer transactions</h3>}
                                        {error_fetching_fun_types && <h3 className="text-display text-center bg-dark text-white">Please set fun types for customer completed transaction</h3>}
                                        {transaction_completed && <h3 className="text-display text-center bg-dark text-white">Transaction Completed, funbee won- {funbees_won} </h3>}

                                    </div>

                                </div>
                            </div>
                        </div>
                )}
                </AuthUserContext>
                <div id="transaction_history_list">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                                <h3 className="text-display text-center bg-dark text-white">Transaction History</h3>
                            {loading_transactions && <p className="text-display text-center bg-dark text-white">loading transactions...</p>}
                            {transaction_processed &&
                            <FirebaseContext.Consumer>

                                {firebase=>(
                                <TransactionProcessed firebase={firebase} transaction_processed={transaction_processed} user_verified={user_verified} transaction_amount={transaction_amount} onRemoveTransaction={this.onRemoveTransaction} />)

                                }
                            </FirebaseContext.Consumer> }
                            {transaction_processed.length <= 0 && <h3 className="text-display text-center bg-dark text-white">No Transaction Processed yet!</h3>}
                        </div>    
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

const TransactionProcessed=({transaction_processed,user_verified,transaction_amount,onRemoveTransaction,firebase})=>(
    <div>
    {transaction_processed.map(transaction=>(
        <TransactionTemplate transaction_processed={transaction} onRemoveTransaction={onRemoveTransaction} user_verified={user_verified} transaction_amount={transaction_amount} firebase={firebase}/>
    ))}
    </div>
)

class TransactionTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={users:[],places:[],transaction_processed:this.props.transaction_processed}
    }

    componentDidMount(){
        const transaction_processed=this.state.transaction_processed
       this.props.firebase.users().on('value',snapShot=>{
           const transactionObj=snapShot.val()
           const transactionArr=Object.keys(transactionObj).map(key=>({
               ...transactionObj[key],uid:key
           }))
           this.setState({users:transactionArr})
           console.log(transactionArr.filter((t)=>t.uid===transaction_processed.user_id))
       })
    }

    render(){
        const {users,transaction_processed}=this.state
        var current_users=users.filter((t)=>t.uid===transaction_processed.user_id)
        console.log(this.props.transaction_processed.fun_types_offered)
        

        return(
            
                            <div className="card bg-dark" id="show_transaction_history">
                                <div className="card-title">
                                    <span className="text-right text-sm text-display"><i className="fa fa-remove mx-2 text-red" onClick={(()=>this.props.onRemoveTransaction(this.props.transaction_processed.uid))}></i><i className="fa fa-edit mx-2 text-white"></i><i id="transaction_code">transaction code: {this.props.transaction_processed.user_id}</i></span>
                                {(()=>{
                                    for(let i=0;i<current_users.length;i++){
                                        return <h3 className="text-display text-center bg-dark text-white">{current_users[i].username}</h3>
                                    }
                                })()}
                                    <div className="card-body">
                                        <h5 className="text-display text-center text-white"> {this.props.transaction_processed.funbees}</h5>
                                    </div>
                                
                                </div>
                                <p className="text-center text-white text-display">Congratulations, your transaction has earned the following funbees</p>
                                <p className="text-center text-white text-display">Be creative in choosing which to enjoy!</p>
                                <div className="form-check-inline">
                                    {this.props.transaction_processed.fun_types_offered.map((fun_type) =>
                                    <span className="mx-2"><label className="mx-1 text-white" for={fun_type.fun_type}>{fun_type.fun_type}({fun_type.unit_cost})</label><input className="form-check-input text-white" name={fun_type} type="checkbox" value={fun_type} checked="true"/></span>)}
                                </div>
                            </div>
        )
    }
}



export default withFirebase(AcceptTransactionFB)