import React from 'react'
import {withFirebase, FirebaseContext} from '../firebase'
import { AuthUserContext } from '../session';

class MyTransactionsFB extends React.Component{
    constructor(props) {
        super(props);

        this.state = {user_transaction_fun_list:[]}
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            this.props.firebase.funSlots().orderByChild('user_id').equalTo(authUser.uid).on('value',snapShot=>{
                const transactionFunObject=snapShot.val()
                if(transactionFunObject){
                const transactionFunArr=Object.keys(transactionFunObject).map(key=>({
                    ...transactionFunObject[key],uid:key
                }))
                this.setState({user_transaction_fun_list:transactionFunArr})
            }
            else{
                this.setState({user_transaction_fun_list:[]})
            }

            })
        })
    }
    

    render(){
        const {user_transaction_fun_list} = this.state

        return (
            <div id="my_transactions">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>

                    </div>
                </div>
            {user_transaction_fun_list.length<=0 ? <h3 className="display-4 text-center text-white bg-dark">You have not made any transactions yet!</h3> : 
            <FirebaseContext.Consumer>
            {firebase=>(
                        <MyTransactionList transaction_list={user_transaction_fun_list} firebase={firebase}/>
            )}
            </FirebaseContext.Consumer>
            }
            </div>
        )
    }
}

const MyTransactionList=({transaction_list,firebase})=>(
    <div className="container mt-3"> 
        {transaction_list.map((transaction)=>(<TransactionTemplate transaction={transaction} firebase={firebase}/>))}
    </div>
)

class TransactionTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={places:[]}

    }

    componentDidMount(){
        //fetch places so we caan use the id from transaction list to match and get place details for the current transaction

        this.props.firebase.places().on('value',snapShot=>{
            const placeObj = snapShot.val()
            const placeArr = Object.keys(placeObj).map(key=>({
                ...placeObj[key],uid:key
            }))
            this.setState({places:placeArr})
        })
    }

    render(){

        const {places}=this.state
        const current_place=places.filter(place=>place.uid===this.props.transaction.place_id) //get place detail for the current iteration of transaction
        //do not use directly as in currenct_user[0].username ...rathwer loop through and access the fields needed
        return(
            <div className="row">
                <div className="col-lg-12 sm-12">
                <div className="card bg-dark" id="show_transaction_history">
                    <div className="card-title">
                            <span>{this.props.transaction.status && <i className="fa fa-check-circle" id="processed"></i>}<p className="text-center text-display text-white"><i>transaction code: {this.props.transaction.user_id}</i></p></span>
                        {(() => {
                            for (let i = 0; i < current_place.length; i++) {
                                return <h3 className="text-display text-center bg-dark text-white">{current_place[i].place_name}</h3>
                            }
                        })()}
                        <div className="card-body">
                            <h5 className="text-display text-center text-white">funcoin reward: <i className="fa fa-money"></i> {this.props.transaction.funbees_won}</h5>
                        </div>

                    </div>
                    <p className="text-center text-white text-display">Congratulations, your transaction has earned the following funbees</p>
                    <p className="text-center text-white text-display">Redeem according to the funcoin reward!</p>
                    <div className="form-check-inline">
                        {this.props.transaction.fun_types_offered.map((fun_type) =>
                            <span className="mx-2"><label className="mx-1 text-white" for={fun_type.fun_type}>{fun_type.fun_type}({fun_type.unit_cost})</label><input className="form-check-input text-white" name={fun_type} type="checkbox" value={fun_type} checked="true" /></span>)}
                            
                    </div>
                </div>

            </div>
            </div>
        )
    }
}

export default withFirebase(MyTransactionsFB)