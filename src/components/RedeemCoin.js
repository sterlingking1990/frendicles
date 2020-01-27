import React from 'react'
import {withFirebase} from '../firebase';


class RedeemCoin extends React.Component{
    constructor(props){
        super(props);

        this.state={fun_slot_array:[],error_verified:false,fun_code:'',amount_to_redeem:'',updated:false,empty_input:false}

    }

    onChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }

    verifyCode = () => {
        const {fun_code,amount_to_redeem} = this.state
        const is_empty=fun_code==='' || amount_to_redeem===''
        if(!(is_empty)){
        this.props.firebase.funSlots().orderByChild('user_id').equalTo(fun_code).on('value', snapShot => {
            const funSlotObject = snapShot.val()
            if (funSlotObject) {
                const funSlotArr = Object.keys(funSlotObject).map(key => ({
                    ...funSlotObject[key], uid: key
                }))
                this.setState({ fun_slot_array: funSlotArr })

                //use algorithm to update the status as processed
                var total_sum_funbees=funSlotArr[0].funbees_won
                var id_to_update = funSlotArr[0].uid;
                var i=1;
                    while (parseInt(total_sum_funbees) <= parseInt(amount_to_redeem)) {
                        
                        this.props.firebase.funSlot(id_to_update).update({
                            status: 'processed'
                        })
                        
                        if (i >= (funSlotArr.length)) {
                            this.setState({ updated: true })
                            break;
                        }
                        else{
                            total_sum_funbees += funSlotArr[i].funbees_won;
                            id_to_update = funSlotArr[i].uid;
                            i+=1;
                        }
                    }
            }
            else {
                this.setState({ error_verified: true })
            }
        })
    }
    else{
        this.setState({empty_input:true})
    }

    }

    render(){
        const{fun_code,amount_to_redeem,updated,error_verified,empty_input}=this.state;
        return(
            <div className="set-goal">
                <div className="section">
                    <div className="banner">

                    </div>
                    <div className="banner-text">
                        <h3>How close are you to reaching your rewards Goal?</h3>
                        <p>We help you meet your goals as you make transactions</p>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            {updated && <h3 className="text-display text-white bg-dark text-center">Successfully redeemed customer reward</h3>}
                            {error_verified && <h3 className="text-display text-white bg-dark text-center">Could not fetch user transaction data</h3>}
                            {empty_input && <h3 className="text-display text-white bg-dark text-center">Please fill all input to redeem user data</h3>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            <div className="form-group">
                                <input className="form-control" name="fun_code" type="text" placeholder="enter transaction fun code to confirm" onChange={this.onChange} value={fun_code} />
                            </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 sm-12">
                                <div className="form-group">
                                    <input className="form-control" type="number" name="amount_to_redeem" placeholder="enter amount to redeem" onChange={this.onChange} value={amount_to_redeem} />
                                </div>
                                <div className="form-group">
                                    <button className="form-control bg-success" onClick={this.verifyCode}>Redeem Coin</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withFirebase(RedeemCoin)