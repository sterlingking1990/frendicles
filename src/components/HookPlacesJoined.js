import React from 'react'
import { connect } from 'react-redux'
import joinVisibility from '../Visibility/Join/join'
import PlaceTemplate from '../connectedComponents/PlaceTemplate'
import FilterJoin from '../connectedComponents/FilterJoin'


const HookPlacesJoined = (props) => (
    <div id="places_joined">
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-12 sm-12">
                    {props.joinHookReducer.length>0 && <FilterJoin/>}
                    {props.joinHookReducer.length===0 && <p className="text-display display-4">No Hook Joined Yet, Join a Hook to begin Cashing on every transaction completed</p>}
                </div>
            </div>
            {props.joinHookReducer.map((join)=><PlaceTemplate path={props.history} join_date={join.createdAt} join_id={join.id} key={join.id} place_id={join.place_id} type="joined" {...props}/>)}
        </div>
    </div>
)

const mapStateToProps=(state,props)=>{
    return{
        joinHookReducer:joinVisibility(state.joinHookReducer,state.filterJoin)
    }
}

export default connect(mapStateToProps)(HookPlacesJoined)