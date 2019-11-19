import React from 'react'
import PlacesLists from '../connectedComponents/PlacesLists'
const HookPlacesToJoin = (props) => (
    <div className="container mt-3">
        <PlacesLists path={props.history} hook_id={props.match.params.id} type="to-join"/>
    </div>
)

export default HookPlacesToJoin