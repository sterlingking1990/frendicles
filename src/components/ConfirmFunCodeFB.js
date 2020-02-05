import React from 'react'
import {withFirebase} from '../firebase';

class ConfirmFunCodeFB extends React.Component{
    constructor(props){
        super(props);
        this.state={fun_code:"",fun_slot_array:[],user:[],place:[],error_verified:false,funcode_processed:false}
        this.saveFunCode=this.saveFunCode.bind(this)

    }

    saveFunCode=event=>{
        const fun_code=event.target.value
        this.setState({fun_code})
    }

    componentDidMount(){
        
        this.props.firebase.users().on('value',snapShot=>{
            const userObject=snapShot.val()
            const userArr=Object.keys(userObject).map(key=>({
                ...userObject[key],uid:key
            }))
            this.setState({user:userArr})
        })

        this.props.firebase.places().on('value',snapShot=>{
            const placeObject=snapShot.val()
            const placeArr=Object.keys(placeObject).map(key=>({
                ...placeObject[key],uid:key
            }))
            this.setState({place:placeArr})
        })


    }

    verifyCode=()=>{
        const fun_code = this.state.fun_code
        this.props.firebase.funSlots().orderByChild('user_id').equalTo(fun_code).on('value', snapShot => {
            const funSlotObject = snapShot.val()
            if(funSlotObject){
            const funSlotArr = Object.keys(funSlotObject).map(key => ({
                ...funSlotObject[key], uid: key
            }))
            this.setState({ fun_slot_array: funSlotArr })
        }
        else{
            this.setState({error_verified:true})
        }
        })

    }

    confirmCode=(e,uid)=>{
        console.log(uid)
        this.props.firebase.funSlot(uid).update({
            status:'processed'
        })
            this.setState({funcode_processed:true,error_verified:false})
        e.preventDefault()
    }


    render(){
        const {fun_code,fun_slot_array,user,place,error_verified,funcode_processed}=this.state
        return(
            <div id="confirm_transaction_code">
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            {funcode_processed && <h5 className="display-4 text-center text-white bg-dark">Updated successfully</h5>}

                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="enter transaction fun code to confirm" onChange={this.saveFunCode} value={fun_code}/>
                            </div>
                            <div className="form-group">
                                <button className="form-control bg-success" onClick={this.verifyCode}>Verify</button>
                            </div>
                            {(()=>{
                                if(fun_slot_array.length>0){
                                    for(let i = 0; i<fun_slot_array.length;i++){
                                        const user_detail = user.filter(u => u.uid === fun_slot_array[i].user_id)
                                        const place_detail = place.filter(p => p.uid === fun_slot_array[i].place_id)
                                        
                                        return  <div className="card bg-dark" id="show_transaction_history">
                                                <div className="card-title">
                                                    <h5 className="text-display text-center bg-dark text-white">offer - {place_detail[i].place_name}</h5>
                                                    <h5 className="text-display text-center bg-dark text-white">by <i className="fa fa-user"></i> {user_detail[i].username}</h5>
                                                    <div className="card-body">
                                                        <h5 className="text-display text-center text-white">funcoin award <i className="fa fa-money"></i> {fun_slot_array[i].funbees}</h5>
                                                    </div>
                                                </div>
                                                <p className="text-center text-white text-display">funbees earned</p>
                                                <div className="form-check-inline">
                                                    {fun_slot_array[i].fun_types_offered.map((fun_type) =>
                                                        <span className="mx-2"><label className="mx-1 text-white" for={fun_type.fun_type}>{fun_type.fun_type}({fun_type.unit_cost})</label><input className="form-check-input text-white" name={fun_type} type="checkbox" value={fun_type} checked="true" /></span>)}
                                                </div>
                                                <div className="form-group">
                                                    <button className="form-control bg-success" onClick={((e)=>this.confirmCode(e,fun_slot_array[i].uid))}>Confirm</button>
                                                </div>
                                            </div>
                                    }
                                }
                                })()} 
                                {error_verified && <h3 className="display-4 text-center text-white bg-dark">Could not verify fun code, wrong code entered</h3>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(ConfirmFunCodeFB)

