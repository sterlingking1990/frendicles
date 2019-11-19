import React from 'react'
import { connect } from 'react-redux'
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css';
import { setJoinStartDate, setJoinEndDate } from '../Actions/Join/joinfilters';


class FilterJoin extends React.Component{
    constructor(props){
        super(props);
        this.state={calendarFocused:null}
        this.onFocusChange=this.onFocusChange.bind(this)
        this.onDatesChange=this.onDatesChange.bind(this)
    }

    onDatesChange=({startDate,endDate})=>{
        this.props.dispatch(setJoinStartDate(startDate))
        this.props.dispatch(setJoinEndDate(endDate))
    }

    onFocusChange=(calendarFocused)=>{
        this.setState(()=>({calendarFocused}))
    }



    render(){
        return (
            <div className="card bg-white">
                <div className="card-body m-auto">
                    <div className="card-content">
                <DateRangePicker
                 startDate={this.props.filterJoin.startDate}
                 startDateId="startDate"
                 endDate={this.props.filterJoin.endDate}
                 endDateId="endDate"
                 onDatesChange={this.onDatesChange}
                 focusedInput={this.state.calendarFocused}
                 onFocusChange={this.onFocusChange}
                 numberOfMonths={1}
                 showClearDates={true}
                 isOutsideRange={()=>false}
                />
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state.filterJoin)
    return{
        filterJoin:state.filterJoin
    }
}


export default connect(mapStateToProps)(FilterJoin)