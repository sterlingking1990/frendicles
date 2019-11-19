import React from 'react'
import {connect} from 'react-redux'
import HookTemplate from '../connectedComponents/HookTemplate'
import {getHooksVisibility, getHooksToJoinVisibility} from '../../src/Visibility/Hooks/hooks'
import HookListsFilterInput from '../../src/connectedComponents/HookListsFilterInput'

const ConnectedHookList=(props)=>(
    <div id="hook_page">
        <h4 className="display-4 my-4 text-center text-white">{props.type==='admin'?"List of hooks added":"Select Hook to Join"}</h4>
        <HookListsFilterInput/>
        {props.hookReducer.map((hook) =>
            <HookTemplate id={hook.id} key={hook.id} hookDetails={hook} {...props}/>)}
    </div>
)

const mapStateToProps=(state,props)=>{
    console.log("this is from user-",state.hookReducer)
    return{
        hookReducer: props.type === 'user' ? getHooksToJoinVisibility(state.hookReducer, state.hookFilters) : getHooksVisibility(state.hookReducer, state.hookFilters)
    }

}

export default connect(mapStateToProps)(ConnectedHookList)