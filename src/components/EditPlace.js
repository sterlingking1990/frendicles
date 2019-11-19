import React from 'react'
import PlaceCreateEditHOC from '../connectedComponents/PlaceCreateEditHOC'
import { editPlace, deletePlace } from '../Actions/Places/places'
import { connect } from 'react-redux'
//props.match.params.id
const EditPlace = (props) => (
    <div>
        <PlaceCreateEditHOC hooks={props.hookReducer} place={props.placeReducer} onSubmit={({ hooks, place_name, description, image, contact, createdAt }) => {
            props.dispatch(editPlace(props.match.params.id,{hooks: hooks, place_name: place_name, description: description, image: image, contact: contact, createdAt: createdAt }))
            props.history.push('/places-page')

        }} />
        <div className="container">
            <div className="row">
                <div className="col-lg-12 sm-12">
                    <div className="form-group">
                        <button className="form-control btn-dark text-white" onClick={(e)=>{
                            props.dispatch(deletePlace(props.match.params.id))
                            props.history.push('/places-page')
                        }}>Delete</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
)

const mapStateToProps=(state,props)=>{
    return {
    hookReducer:state.hookReducer,
    placeReducer:state.placeReducer.find((place)=>place.id===props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditPlace)