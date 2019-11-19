//FILTER FOR HOSTS
import moment from 'moment'


const stateFilterJoin = {startDate: moment().startOf('month'), endDate:moment().endOf('month')}
const FilterJoin = (state = stateFilterJoin, action) => {
    switch (action.type) {
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate }
        
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate }
        default:
            return state
    }
}

export default FilterJoin