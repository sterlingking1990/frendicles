import React from 'react'
import { connect } from 'react-redux'
import filterByPlaceName from '../Actions/Places/placesfilter'

const PlaceListsFilterInput = (props) => (
        <div className="row">
            <div className="col-lg-12 sm-12">
                <div className="form-group">
                    <input type="text" value={props.placeFilter.place_name} className="form-control" onChange={(e) => {
                        props.dispatch(filterByPlaceName(e.target.value))
                    }} />
                </div>
            </div>
        </div>
)

const mapStateToProps = (state) => {
    return {
        placeFilter: state.placeFilter
    }
}

export default connect(mapStateToProps)(PlaceListsFilterInput)