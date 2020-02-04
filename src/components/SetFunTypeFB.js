import React from 'react'
import { withFirebase } from '../firebase'
import { AuthUserContext } from '../session';
import { setTimeout } from 'timers';

class SetFunTypeFB extends React.Component {
    constructor(props) {
        super(props);
        this.state = { already_exists:false,fun_type_db:[],fun_type:'',unit_cost: 0, savedSettings:false,empty_fun_data:false,loading_fun_data:true}
    }

    componentDidMount(){
        //fetch the fun types being saved
        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            this.props.firebase.funTypes().orderByChild('userId').equalTo(authUser.uid).on('value',snapShot=>{
                const funTypeObject=snapShot.val()
                if(funTypeObject){
                const funTypeArr=Object.keys(funTypeObject).map(key=>({
                    ...funTypeObject[key],uid:key
                }))
                this.setState({fun_type_db:funTypeArr,loading_fun_data:false})

            }
            else{
                this.setState({empty_fun_data:true,loading_fun_data:false})
            }
            })
        })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    saveFunSetting = (e, authUser) => {
        const fun_type = this.state.fun_type
        var fun_type_db=this.state.fun_type_db
        const unit_cost = this.state.unit_cost
        var array_fun_type=[]
        for(let i =0;i<fun_type_db.length;i++){
            array_fun_type.push(fun_type_db[i].fun_type===fun_type && fun_type_db[i].unit_cost===unit_cost)
        }
        if(array_fun_type.some(t=>t===true)){
            this.setState({already_exists:true})
        }else{
            this.props.firebase.funTypes().push({
            fun_type,
            unit_cost,
            userId: authUser.uid,
        })

        this.setState({ savedSettings: true })

        setTimeout(function () {
            this.setState({ savedSettings: false });
        }.bind(this), 2000)


        }

        
        e.preventDefault()

    }

    onRemoveFun=uid=>{
        this.props.firebase.FunTypes(uid).remove()
        //update the container
        const new_settings_detail = this.state.fun_type_db.filter((fun) => fun.uid !== uid)
        if (new_settings_detail.length > 0) {
            this.setState({ fun_type_db: new_settings_detail })
        }
        else {
            this.setState({ fun_type_db: [] })
        }
        
    }

    render() {
        const { fun_type_db,fun_type, unit_cost, savedSettings,empty_fun_data,loading_fun_data,already_exists } = this.state

        return (
            <div id="set_fun_limit">
                <div className="section">
                    <div className="banner">

                    </div>
                    <div className="banner-text">
                        <p>Welcome to Ofatri a platform that rewards you for every penny you spend on transactions.</p>
                        <span><strong>Make Transactions </strong></span> <strong> Get Rewarded</strong> <span><strong>Achieve Goals</strong></span>
                       
                    </div>
                </div>
            <AuthUserContext>
                {authUser => (
                        <div className="container mt-3">
                            {savedSettings && <p className="text-display text-center text-white bg-dark">Saved successfully, add more!</p>}
                            {already_exists && <p className="text-display text-center text-white bg-dark">Data Already Exists, please add new info</p>}
                            <div className="row">
                                <div className="col-lg-6 sm-12">
                                    <div className="form-group">
                                        <input name="fun_type" value={fun_type} className="form-control" type="text" placeholder="enter fun type" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="col-lg-6 sm-12">
                                    <div className="form-group">
                                        <input name="unit_cost" value={unit_cost} className="form-control" type="number" placeholder="enter unit cost" onChange={this.onChange} />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-lg-12 sm-12">
                                    <div className="form-group">
                                        <button className="form-control bg-dark text-white" onClick={(e) => this.saveFunSetting(e, authUser)}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                )}
            </AuthUserContext>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <h3 className="text-display text-white text-center display-4 my-3">Fun Types</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 sm-12">
                    {fun_type_db.length <= 0 && <h4 className="text-display text-success text-center bg-dark">No Fun Data set</h4>}
                    </div>
                    <div className="col-lg-12 sm-12">
                    {loading_fun_data && <p className="text-display text-white text-center bg-dark">loading...</p>}
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <FunType fun_type_db={fun_type_db} onRemoveFun={this.onRemoveFun}/>
            </div>
            
        </div>
        )
    }
}

const FunType=({fun_type_db,onRemoveFun})=>(
    <div>
        {fun_type_db.map(fun_type => (<FunTypeTemplate key={fun_type.uid} fun={fun_type} onRemoveFun={onRemoveFun}/> ))}
    </div>
)

class FunTypeTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
                <div className="row" id="display_fun">
                    <div className="col-lg-12 sm-12">
                        <div className="card bg-dark">
                        <span className="text-right text-sm text-display"><i className="fa fa-remove mx-2 text-red" onClick={(() => this.props.onRemoveFun(this.props.fun.uid))}></i></span>

                            <div className="card-title">
                                <h3 className="display-4 text-center text-display text-success my-3">{this.props.fun.fun_type}</h3>
                                <p className="text-display text-center text-white text mt-3">{this.props.fun.unit_cost}</p>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default withFirebase(SetFunTypeFB)