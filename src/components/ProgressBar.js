import React,{Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Tracker = styled.div`
width:100%;
height:20px;
margin:15px auto;
background: rgb(34,34,34);
border-radius:10px;
box-shadow:inset 0 0 5px #000;
`;

const ProgressInTracker = styled.div`
width: ${props => props.percentage}%;
height:100%;
background-color: ${props => props.color};
border-radius:8px;
`;

class ProgressBar extends Component{
    render(){
        return(
            <Tracker>
                <ProgressInTracker percentage={this.props.percentage} color={this.props.color}/>
            </Tracker>
        )
    }
}

ProgressBar.propTypes={
    percentage:PropTypes.number
}

export default ProgressBar