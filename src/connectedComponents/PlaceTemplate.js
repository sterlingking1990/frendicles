import React from 'react'
import DisplayHookFromID from './DisplayHookFromID';
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {joinHook,unJoinHook} from '../Actions/Join/join'
import moment from 'moment';
const PlaceTemplate = (props) => (
            <div className="row my-3">
                <div className="col-lg-12 sm-12">
                    <div className="card bg-white">
                        <div className="card-title">
                            {props.type === 'admin' && <p className="text-success text-center"><Link to={`/edit-place/${props.placeDetail.id}`}>{props.placeDetail.place_name}</Link></p> }
                            {props.type==='to-join' && <p className="text-success text-center">{props.placeDetail.place_name}</p>}
                            {props.type === 'joined' && <p className="text-success text-center">{props.placeReducer.place_name} - joined {moment(props.join_date).fromNow()}</p>}
                            {props.type==='admin' && <img src={props.placeDetail.image} alt="noplace.jpg" className="img-fluid img-responsive" />}
                            {props.type === 'to-join' && <img src={props.placeDetail.image} alt="noplace.jpg" className="img-fluid img-responsive" />}
                            {props.type === 'joined' && <img src={props.placeReducer.image} alt="noplace.jpg" className="img-fluid img-responsive" />}

                            <div className="card-body">
                                {props.type==='admin' && <p className="text-justify">{props.placeDetail.description}</p>}
                                {props.type === 'to-join' && <p className="text-justify">{props.placeDetail.description}</p>}
                                {props.type === 'joined' && <p className="text-justify">{props.placeReducer.description}</p>}
                                {props.type==='admin' && <p className="text-justify">{props.placeDetail.contact}</p>}
                                {props.type === 'to-join' && <p className="text-justify">{props.placeDetail.contact}</p>}
                                {props.type === 'joined' && <p className="text-justify">{props.placeReducer.contact}</p>}

                                <p className="bg-dark text-white">Features</p>
                                {props.type==='admin' && <div className="form-check-inline">
                                    {props.placeDetail.hooks.map((hook) =>
                                        <DisplayHookFromID id={hook} key={hook} hook={hook} />)}
                                </div>}
                                {props.type === 'to-join' && <div className="form-check-inline">
                                    {props.placeDetail.hooks.map((hook) =>
                                    <DisplayHookFromID id={hook} key={hook} hook={hook} />)}
                                </div>}
                                {props.type === 'joined' && <div className="form-check-inline">
                                {props.placeReducer.hooks.map((hook) =>
                                <DisplayHookFromID id={hook} key={hook} hook={hook} />)}
                                </div>}


                            </div>
                        </div>
                        {props.type === 'to-join' && 
                        <div className="form-group">
                            <button className="form-control bg-dark text-white" onClick={((e)=>{
                                props.dispatch(joinHook({place_id:props.placeDetail.id,createdAt:moment().format()}))
                                props.path.push('/hook-places-joined')
                            })}>Join</button>
                    </div>}
                    {props.type === 'joined' &&
                    <div className="form-group">
                        <button className="form-control bg-dark text-white" onClick={((e)=>{
                            props.dispatch(unJoinHook(props.join_id))
                        })}>UnJoin</button>
                    </div>}
                    </div>
                </div>
            </div>

)

const mapStateToProps = (state, props) => {
    return {
        placeReducer: state.placeReducer.find((place) => place.id === props.place_id)
    }
}

export default connect(mapStateToProps)(PlaceTemplate)
