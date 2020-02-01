import React from 'react'
import { withFirebase } from '../firebase'
var paystack = require('paystack')('sk_test_4f0aaaf4cb4e7b094ea4d92dce5eddc940c344cd')


class VerifyTransaction extends React.Component{
    constructor(props){
        super(props)
        this.state={transaction_reference:'',transactions:[], new_data:[],status:'',loading:true}
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
        .then(data=>this.setState({transactions:[data],loading:false}))



        e.preventDefault();
        
}

    render(){
        const {transaction_reference,data,status,loading,transactions} =this.state
        console.log(transactions)

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
                    {!loading? Object.keys(transactions).map(key=><Transaction key={key} body={[transactions[key]]}/>) : <p className="display-text text-white bg-dark text-center">loading...</p> 
                        
                    }
                    </div>
                </div>
        )
    }

}

const Transaction =({body})=>{
    console.log(body[0].message)
    return(
        <div>
            {body.map(transaction=>{
                const {message,data} = transaction
                const {amount,reference,paid_at,metadata,customer}=[data][0]
                const {offer}=[metadata][0]
                const {email}=[customer][0]
                    return (
                        <div className="row">
                        <div className="col-lg-12">
                            <h2>{message}</h2>
                            <div className="card">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Transaction for- {offer}</li>
                                    <li className="list-group-item">Paid by- {email}</li>
                                    <li className="list-group-item">Amount - {amount}</li>
                                    <li className="list-group-item">Date Paid- {paid_at}</li>
                                    <li className="list-group-item">Reference- {reference}</li>
                                </ul>
                            </div>
                            <hr />
                        </div>
                        </div>
                    );
                })}
            </div>
    );
        };
                
                
// }
//     <div className="row">
//     {data.map(dat=>(<VerificationTemplate data={dat} />))}
//     </div>
// )

// class VerificationTemplate extends React.Component{
//     constructor(props){
//         super(props);
//     }

//     render(){
//         return(
//             <div className="col-lg-12">
//                 <div class="card" style="width: 18rem;">
//                     <div class="card-header">
//                         Payment details
//                                 </div>
//                     <ul class="list-group list-group-flush">
//                         <li class="list-group-item">Amount paid -{this.props.data.status}</li>
//                         {/* <li class="list-group-item">Date Paid- {data_obj.data.paid_at}</li>
//                                     <li class="list-group-item">By- {data_obj.metadata.offer}</li>
//                                     <li class="list-group-item">By- {data_obj.contact.email}</li> */}
//                     </ul>
//                 </div>
//             </div>
//         )
//     }
// }

export default withFirebase(VerifyTransaction)