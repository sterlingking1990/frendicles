import React from 'react'
import { withFirebase } from '../firebase'
var paystack = require('paystack')('sk_test_4f0aaaf4cb4e7b094ea4d92dce5eddc940c344cd')


class VerifyTransaction extends React.Component{
    constructor(props){
        super(props)
        this.state={transaction_reference:'',data:''}
    }


    setReference=event=>{
        const reference=event.target.value
        this.setState({transaction_reference:reference})
    }

    verify=(e)=>{
        const trans_ref=this.state.transaction_reference
        const API = "https://api.paystack.co/transaction/"
        console.log(trans_ref)
        fetch(API + trans_ref,{ 
   method: 'get', 
   headers: new Headers({
     'Authorization': 'Bearer sk_test_4f0aaaf4cb4e7b094ea4d92dce5eddc940c344cd',
   })})
        .then(response => response.json())
        .then(data => this.setState({ data }));
        e.preventDefault();
}
    render(){
        const {transaction_reference,data} =this.state
        console.log(data)
        return(
            <div>
                <div className="section">
                    <div className="banner">

                    </div>
                    <div className="banner-text">
                        <h3>Make transactions, Get Rewarded, Reach your Goals</h3>
                    </div>
                </div>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="enter transaction reference to verify" value={transaction_reference} onChange={this.setReference}/>
                            </div>

                            <div className="form-group">
                                <button className="form-control btn-success text-white" onClick={(e)=>this.verify(e)}>Verify Transaction Reference</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withFirebase(VerifyTransaction)