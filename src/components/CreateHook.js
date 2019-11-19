import React from 'react'
import HookCreateEditHOC from '../../src/connectedComponents/HookCreateEditHOC'
import { connect } from 'react-redux'
import { addHook } from '../../src/Actions/Hooks/hooks'

const CreateHook=(props)=>(
    <div>
        <HookCreateEditHOC title="Create new Hook" onSubmit={({hook,description})=>{
            props.dispatch(addHook({hook:hook,description:description}))
            props.history.push('/hooks-page')
        }}/>
    </div>
)




export default connect()(CreateHook)