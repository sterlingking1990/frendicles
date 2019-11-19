import React from 'react'
import HookCreateEditHOC from '../connectedComponents/HookCreateEditHOC'
import { editHook,deleteHook } from '../Actions/Hooks/hooks'

import { connect } from 'react-redux'

const EditHook = (props) => {
    return (
    <div>
    
        <HookCreateEditHOC hooks={props.hookReducer} title="Edit Hook" onSubmit={({ hook,description })=>{
            props.dispatch(editHook(props.match.params.id,{hook:hook,description:description}))
                props.history.push('/hooks-page')
        }}
        />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 sm-12">
                        <button className="form-control btn-danger" onClick={(e) => {
                            props.dispatch(deleteHook(props.match.params.id))
                            props.history.push('/hooks-page')
                        }}>Delete</button></div>
                    </div>
                </div> 
        </div>
    )
}

const mapStateToProps=(state,props)=>{
    return{ 
        hookReducer:state.hookReducer.find((hookDetails)=>hookDetails.id===props.match.params.id)
    }
}



export default connect(mapStateToProps)(EditHook)