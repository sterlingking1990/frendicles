import React from 'react'
import {connect} from 'react-redux'
const DisplayHookFromID=(props)=>(
    <div>
        <span className="mx-1"><i className="fa fa-check" aria-hidden="true"></i>{props.hookReducer.hook}</span>
    </div>
)

const mapStateToProps=(state,props)=>{
    return {

        hookReducer:state.hookReducer.find((hook)=>hook.id===props.hook)
    }
}

export default connect(mapStateToProps)(DisplayHookFromID)


