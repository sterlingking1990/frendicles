import moment from 'moment'
const joinVisibility=(joinHookReducer,{startDate,endDate})=>{
    return joinHookReducer.filter((join)=>{
        const createdAtMoment=moment(join.createdAt)
        const isStartDate=startDate ? startDate.isSameOrBefore(createdAtMoment):true
        const isEndDate = endDate ? endDate.isSameOrAfter(createdAtMoment): true

        return isStartDate && isEndDate
    }).sort((a,b)=>a.createdAtMoment<b.createdAtMoment?1:-1)
}

export default joinVisibility