import React from 'react'
import { connect} from 'react-redux'
import filterByHookName from '../Actions/Hooks/hooksfilter'

const hookListFilterInput=(props)=>(
    <div className="container">
        <div className="row">
            <div className="col-lg-12 sm-12">
                <div className="form-group">
                    <input type="text" value={props.hookFilters.hook_name} className="form-control" onChange={(e)=>{
                        props.dispatch(filterByHookName(e.target.value))
                    }}/>
                </div>
            </div>
        </div>

    </div>
)

const mapStateToProps=(state)=>{
    return {
        hookFilters:state.hookFilters
    }
}

export default connect(mapStateToProps)(hookListFilterInput)