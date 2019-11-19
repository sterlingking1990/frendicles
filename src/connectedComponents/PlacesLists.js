import React from 'react'
import { connect } from 'react-redux'
//import DisplayHookFromID from '../connectedComponents/DisplayHookFromID'
//import SinglePlacePage from '../connectedComponents/SinglePlacePage'
import PlaceTemplate from '../connectedComponents/PlaceTemplate'
import PlaceListsFilterInput from '../connectedComponents/PlaceListsFilterInput'
import {getPlacesVisibility,getPlacesToJoinVisibility} from '../Visibility/Places/places'

const PlacesLists = (props) => (
    <div id="places">
        <div className="container">
        <PlaceListsFilterInput/>
        {props.placeReducer.map((place) =>
            <PlaceTemplate path={props.path} id={place.id} key={place.id} placeDetail={place} {...props} />)}
        </div>

    </div>
)

const mapStateToProps = (state,props) => {
    return {
        placeReducer: props.type === 'to-join' ? getPlacesToJoinVisibility(state.placeReducer, state.placeFilter, props.hook_id) : getPlacesVisibility(state.placeReducer, state.placeFilter)
    }
}


export default connect(mapStateToProps)(PlacesLists)