import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const HookTemplate=(props)=>(
    <div className="row">
        <div className="col-lg-12 sm-12">
            <div className="card my-1">
                <div className="card-title">
                    <div className="card-body">
                        {props.type === 'admin' ? <p className="text-center"> <Link to={`/edit-hook/${props.id}`}>{props.hookDetails.hook}</Link></p> : <p className="text-center"> <Link to={`/hook-places/${props.id}`}>{props.hookDetails.hook}</Link></p> }
                        <p className="text-center">{props.hookDetails.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default connect()(HookTemplate)