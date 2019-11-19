import {createStore, combineReducers} from 'redux'
import HookReducer from '../Reducers/Hooks/hooks'
import HookFilterReducer from '../Reducers/Hooks/hooksfilters'
import PlaceReducer from '../Reducers/Places/places'
import PlaceFilterReducer from '../Reducers/Places/placesfilters'
import JoinHookReducer from '../Reducers/Join/join'
import FilterJoin from '../Reducers/Join/joinfilters'
import LoginReducer from '../Reducers/Login/login'
//STORE DEFINITION

export default ()=>{
const store = createStore(combineReducers({
    loginReducer:LoginReducer,
    hookReducer: HookReducer,
    hookFilters: HookFilterReducer,
    placeReducer: PlaceReducer,
    placeFilter: PlaceFilterReducer,
    joinHookReducer: JoinHookReducer,
    filterJoin: FilterJoin,
}))

    return store;

}