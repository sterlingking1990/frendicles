import React from 'react';
import { connect } from 'react-redux';
import PlaceCreateEditHOC from '../connectedComponents/PlaceCreateEditHOC'
import { addPlace } from '../Actions/Places/places';
//here we need to connect this component so that we pass the hooks that have been created to the HOC for create and edit of places


const CreatePlace = (props) => (
    <div>
        <h3>Welcome to create place form</h3>
        
        <PlaceCreateEditHOC hooks={props.hookReducer} place={props.placeReducer} onSubmit={({hooks,place_name,description,image,contact,createdAt})=>{
            props.dispatch(addPlace({hooks:hooks,place_name:place_name,description:description,image:image,contact:contact,createdAt:createdAt}))
            props.history.push('/places-page')

        }}/>
    </div>
)


const mapStateToProps=(state)=>{
    return{
        hookReducer:state.hookReducer,
        placeReducer:state.placeReducer
    }
}



export default connect(mapStateToProps)(CreatePlace)