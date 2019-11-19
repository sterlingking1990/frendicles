import {createStore, combineReducers} from 'redux';
import React from 'react';
import uuid from 'uuid'


//declare loginReducer
const loginUser=({user_name="",email="",phone_number=""})=>({
    type:'LOGIN_USER',
    userDetails:{
        id:uuid(),
        user_name,
        email,
        phone_number
    }

})

const loginState=[]
const LoginReducer=(state=loginState,action)=>{
    switch (action.type) {
        case 'LOGIN_USER':
            return [...state,action.userDetails]
    
        default:
            return state
    }
}
//declare actions for HOOKS
//ADD_HOOK
//******************************************************************HOOKS********************************************************* */
const addHook=({hook})=>({
        type:'ADD_HOOK',
        hookDetails:{
        id:uuid(),
        hook
    }
})
//EDIT_HOOK
const editHook=(id,updates)=>({
    type:'EDIT_HOOK',
    id:id,
    updates

})
//DELETE_HOOK
const deleteHook=(id)=>({
    type:'DELETE_HOOK',
    id
})

//HOOKS REDUCER
const currentHookState = []
const HookReducer = (state = currentHookState, action) => {
    switch (action.type) {
        case 'ADD_HOOK':
            return [...state, action.hookDetails]

        case 'DELETE_HOOK':
            return state.filter(({ id }) => id !== action.id)

        case 'EDIT_HOOK':
            return state.map((hook) => {
                if (hook.id === action.id) {
                    return {
                        ...hook,
                        ...action.updates
                    };
                }
                else {
                    return hook

                };
            });

        default:
            return state;
    }
}

//FILTER FOR HOOK
//FILTER_BY_HOOK_NAME
const filterByHookName=(hook_name)=>({
    type:'SET_HOOK_NAME',
    hook_name
})

//HOOKS FILTER REDUCER
const currentFilterState={hook_name:''}
const HookFilterReducer=(state=currentFilterState,action)=>{
    switch (action.type) {
        case 'SET_HOOK_NAME':
            return {...state,hook_name:action.hook_name}//if key exists, it will replace it as no two key can be the same
        default:
            return state;
    }

}

//HOOKS VISIBILITY
const getHooksVisibility=(hookReducer,{hook_name})=>{
    return hookReducer.filter((hook)=>hook.hook.toLowerCase().includes(hook_name.toLowerCase()))
}



//**********************************************************PLACE*************************************************************************** */
//declare actions for PLACES
//ADD_PLACE
const addPlace=({hooks=[],place_name="",description="",image="",contact="",createdAt=0}={})=>({
    type:'ADD_PLACE',
    placeDetails:{
        id:uuid(),
        hooks,
        place_name,
        description,
        image,
        contact,
        createdAt
    }

})
//EDIT_PLACE
const editPlace=(id,updates)=>({
    type:'EDIT_PLACE',
    id,
    updates
})
//DELETE_PLACE
const deletePlace=(id)=>({
    type:'DELETE_PLACE',
    id
})
const placeState=[];
const PlaceReducer = (state=placeState, action) => {
    switch (action.type) {
        case 'ADD_PLACE':
            return [...state,action.placeDetails]
        case 'EDIT_PLACE':
            return state.map((place)=>{
                if(place.id===action.id){
                    return {
                    ...place,
                    ...action.updates
                    };
                }
                else{
                    return place
                }
            });
        case 'DELETE_PLACE':
            return state.filter((place)=>place.id!==action.id)

        default:
            return state
    }
}


//FILTER_BY_PLACE_NAME
const filterByPlaceName=(place_name)=>({
    type:'SET_PLACE_FILTER',
    place_name
})

//FILTER FOR PLACES
const place_filter_state={place_name:""}
const PlaceFilterReducer=(state=place_filter_state,action)=>{
    switch (action.type) {
        case 'SET_PLACE_FILTER':
            return {...state,place_name:action.place_name}
    
        default:
            return state
    }
}
//
//VISIBILITY FOR PLACES

const getPlacesVisibility = (placeReducer,placeFilter) => {
    return placeReducer.filter((place) => {
        const isTextFound = place.place_name.toLowerCase().includes(placeFilter.place_name.toLowerCase())

        return isTextFound 
    })

}



//*************************************************************HOSTS****************************************************************** */
//declare actions for HOSTS
//ADD_HOST
const createHost=({user_id="",hook_id="",description="",condition=[],meet_time=0,date=0,place_id="",dateCreated=0}={})=>({
    type:'CREATE_HOST',
    hostDetails:{
        id:uuid(),
        user_id,
        hook_id,
        description,
        condition,
        meet_time,
        date,
        place_id,
        dateCreated,
    }

})

//EDIT_HOST
const editHost=(id,updates)=>({
    type:'EDIT_HOST',
    id,
    updates
})
//DELETE_HOST

const deleteHost=(id)=>({
    type:'DELETE_HOST',
    id
})

const hostState=[]
const HostReducer=(state=hostState,action)=>{
    switch (action.type) {
        case 'CREATE_HOST':
            return [...state,action.hostDetails]
        case 'EDIT_HOST':
            return state.map((host)=>{
                if(host.id===action.id){
                    return {
                        ...host,
                        ...action.updates
                    }
                }
                else{
                    return host
                }
            });
        case 'DELETE_HOST':
            return state.filter((host)=>host.id!==action.id)
    
        default:
            return state
    }

}



//FILTER_BY_TIME
const filterHostByTime=(time)=>({
    type:'SET_FILTER_TIME',
    time

})

//FILTER_BY_TIME
const filterHostByDate = (date) => ({
    type: 'SET_FILTER_DATE',
    date

})

//FILTER FOR HOSTS
const stateFilterForHost={time:undefined,date:undefined}
const FilterHostReducer=(state=stateFilterForHost,action)=>{
    switch (action.type) {
        case 'SET_FILTER_TIME':
            return {...state,time:action.time}
        case 'SET_FILTER_DATE':
            return {...state,time:action.date}
    
        default:
            return state
    }
}

//HOSTS VISIBILITY
const getMyHostsVisibility = (hostReducer,loginReducer) => {
    return hostReducer.filter((host)=>{
        const isMyHost=host.user_id===loginReducer.id

        return isMyHost;
    })
}

const getOtherHostsVisibility=(hostReducer,filterHostReducer,loginReducer)=>{
    return hostReducer.filter((host)=>{
        const isOtherHost=host.user_id!==loginReducer.id
        const isTime = typeof filterHostReducer.time !== 'number' ||host.meet_time<=filterHostReducer.time
        const isDate = typeof filterHostReducer.date !== 'number' || host.date <= filterHostReducer.date

        return isOtherHost && isTime && isDate
    })
}


//***************************************************************JOIN********************************************************************* */

//JOIN ACTIONS
const joinHost=({user_id="",host_id=""}={})=>({
    type:'JOIN_HOST',
    joinDetails:{
        id:uuid(),
        user_id,
        host_id
    }
})

const unJoinHost=(id)=>({
    type:'UNJOIN_HOST',
    id
})

//REDUCER FOR JOIN
const joinHostState=[]
const JoinHostReducer=(state=joinHostState,action)=>{
    switch (action.type) {
        case 'JOIN_HOST':
            return [...state,action.joinDetails]
        case 'UNJOIN_HOST':
            return state.filter((join)=>join.id!==action.id)
    
        default:
            return state
    }

}

//FILTER FOR JOIN
//FILTER_BY_TIME
const filterHostFromJoinByTime = (time) => ({
    type: 'SET_FILTER_TIME',
    time

})

//FILTER_BY_DATE
const filterHostFromJoinByDate = (date) => ({
    type: 'SET_FILTER_DATE',
    date

})

//FILTER FOR HOSTS
const stateFilterForHostFromJoin = { time: undefined,date:undefined }
const FilterHostReducerFromJoin = (state = stateFilterForHostFromJoin, action) => {
    switch (action.type) {
        case 'SET_FILTER_TIME':
            return { ...state, time: action.time }

        case 'SET_FILTER_DATE':
            return { ...state, time: action.date }

        default:
            return state
    }
}


//VISIBILITY
const getMyJoinVisibility=(joinHostReducer,loginReducer)=>{
    return joinHostReducer.filter((join)=>{
        const isMyJoin=join.user_id===loginReducer.id

        return isMyJoin
    })

}




//***********************************************************STORE*********************************************************************** */
//STORE DEFINITION
const store=createStore(combineReducers({
    loginReducer:LoginReducer,
    hookReducer:HookReducer,
    hookFilters:HookFilterReducer,
    placeReducer:PlaceReducer,
    placeFilter:PlaceFilterReducer,
    hostReducer:HostReducer,
    filterHostReducer:FilterHostReducer,
    joinHostReducer:JoinHostReducer,
    filterHostReducerFromJoin:FilterHostReducerFromJoin,

}))


//***********************************************************************STORE SUBSCRIPTION ***********************************************/
store.subscribe(()=>{
     const state=store.getState()
  
    const visibleHooks = getHooksVisibility(state.hookReducer,state.hookFilters)
    const visiblePlaces = getPlacesVisibility(state.placeReducer,state.placeFilter)
    const myHostsVisibility = getMyHostsVisibility(state.hostReducer,state.loginReducer)
    const otherHostsVisibility = getOtherHostsVisibility(state.hostReducer, state.filterHostReducer,state.loginReducer)
    const myJoinVisibility = getMyJoinVisibility(state.joinHostReducer,state.loginReducer)

    console.log("This is visibility for hooks")
    console.log(visibleHooks);
    console.log("This is visiblility for places")
    console.log(visiblePlaces);
    console.log("This is visibility current user host")
    console.log(myHostsVisibility);
    console.log("This is visibility for other users hosts so current user joins")
    console.log(otherHostsVisibility);
    console.log("This is visibility for the hosts current user joined")
    console.log(myJoinVisibility);

})




//**********************************************************************ACTION DISPATCH*************************************************** */

//LOGIN ACTION TESTING
const user_one=store.dispatch(loginUser({user_name:"izundu kingsley","email":"izundukingsleyemeka@gmail.com","phone_number":"080622222222"}))
const user_two = store.dispatch(loginUser({user_name: "izundu ogochukwu", "email": "izunduogochi@gmail.com", "phone_number": "08064444444" }))
const user_three = store.dispatch(loginUser({user_name: "izundu uchenna", "email": "izunduche@gmail.com", "phone_number": "080604222222" }))
const user_four = store.dispatch(loginUser({user_name: "izundu chioma", "email": "izunduchioma@gmail.com", "phone_number": "080604555550" }))
const user_five = store.dispatch(loginUser({user_name: "izundu onyinye", "email": "izunduonyinye@gmail.com", "phone_number": "08099999901" }))
console.log(user_five)
console.log(user_four)
console.log(user_three)
console.log(user_two)
console.log(user_one)


//HOOKS DISPATCH ACTION TESTING

const one=store.dispatch(addHook({hook:"football and beer"}))
const two= store.dispatch(addHook({ hook: "Long walk and talk" }))
const three = store.dispatch(addHook({ hook: "Bicycle in estate" }))
const four=store.dispatch(addHook({ hook: "swimming staturday" }))
// console.log(one)
store.dispatch(addHook({hook: "work-out in gym" }))
store.dispatch(addHook({hook: "trek long together" }))
store.dispatch(deleteHook(four.hookDetails.id))
const five=store.dispatch(addHook({ hook: "birthday spree" }))
store.dispatch(addHook({ hook: "cry on breakup" }))
store.dispatch(editHook(one.hookDetails.id,{hook: "breakup hangout" }))
store.dispatch(filterByHookName("trek long together"));
store.dispatch(filterByHookName("Cry"));


//PLACE DISPATCH ACTION TESTING
const place_one=store.dispatch(addPlace({hooks:[one.hookDetails.id,two.hookDetails.id],place_name:"Da Oasis Hotel",tag:['swimming pool','bar'],image:"oasis.jpg",contact:"08014545990",createdAt:10029}));
const place_two=store.dispatch(addPlace({ hooks:[three.hookDetails.id], place_name: "Princetol Inn", tag: ['massage', 'winebar'], image: "princeton.jpg", contact: "0803392999", createdAt: 9000 }));
store.dispatch(addPlace({ hook_id: [three.hookDetails.id], place_name: "Dribble man", tag: ['parking', 'love'], image: "dribbleman.jpg", contact: "09094839483", createdAt: 92900 }));
const place_three=store.dispatch(addPlace({ hooks:[one.hookDetails.id], place_name: "Alako Hotel",tag:['barbeque','hotspot'], image: "alako.jpg", contact: "08014545990", createdAt: 2300 }));
const place_four = store.dispatch(addPlace({ hooks: [three.hookDetails.id], place_name: "Ajako park", tag: ['big space', 'ice-cream'], image: "ajako.jpg", contact: "08014545990", createdAt: 55000 }));
const place_five = store.dispatch(addPlace({ hooks: [five.hookDetails.id], place_name: "Sharaton", tag: ['long wal', 'ice-cream'], image: "sharaton.jpg", contact: "08014545990", createdAt: 8800 }));
store.dispatch(editPlace(place_one.placeDetails.id,{hooks:[two.hookDetails.id,three.hookDetails.id], place_name: "Da Oasis Hotel", description:"enjoy beautiful around",tag:['wifi','fish-pond'], image: "oasis.jpg", contact: "08014545990", createdAt: 10029 }));
store.dispatch(deletePlace(place_two.placeDetails.id))
store.dispatch(filterByPlaceName("Da Oasis Hotel"))

//HOST DISPATCH ACTION TESTING

const host_one = store.dispatch(createHost({ user_id: user_one.userDetails.id,place_id: place_four.placeDetails.id,description:"I will love to hang out for a long walk, who is with me",condition:["pic","phone_number"],meet_time:800,date:1200,dateCreated:140290}))
const host_two = store.dispatch(createHost({ user_id: user_one.userDetails.id, place_id: place_three.placeDetails.id, description: "I Love to dance", condition: ["pic", "phone_number"], meet_time: 900,date:9000,dateCreated: 30000 }))
const host_three = store.dispatch(createHost({ user_id:user_two.userDetails.id,place_id: place_one.placeDetails.id, description: "Lets get talking", condition: [], meet_time: 500, date:2000, dateCreated: 16000 }))
const host_four = store.dispatch(createHost({ user_id:user_three.userDetails.id,place_id: place_five.placeDetails.id, description:"happy for Onyi", condition: ["pic","phone_number"], meet_time: 400, date:1700, dateCreated: 36000 }))
store.dispatch(editHost(host_one.hostDetails.id,{description:"Please do come with mat"}))
store.dispatch(deleteHost(host_two.hostDetails.id))

store.dispatch(filterHostByTime(500))
store.dispatch(filterHostByDate(2000))


//JOIN HOST DISPATCH ACTION TESTING
store.dispatch(joinHost({user_id:user_three.userDetails.id,host_id:host_one.hostDetails.id}))
store.dispatch(joinHost({user_id:user_four.userDetails.id,host_id:host_four.hostDetails.id}))
store.dispatch(joinHost({ user_id:user_one.userDetails.id,host_id: host_three.hostDetails.id }))
store.dispatch(joinHost({ user_id: user_three.userDetails.id, host_id: host_four.hostDetails.id }))
const joined_one=store.dispatch(joinHost({ user_id: user_one.userDetails.id, host_id: host_four.hostDetails.id }))
store.dispatch(unJoinHost(joined_one.joinDetails.id))
store.dispatch(filterHostFromJoinByTime())
store.dispatch(filterHostFromJoinByDate())

const ReduxStore=()=>(
    <div>
        <h1>Testing Redux</h1>
    </div>
)


export default ReduxStore