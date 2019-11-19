import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './routers/AppRouter';
import * as serviceWorker from './serviceWorker';
//import ReduxStore from '../src/playground/Redux101'
import ReducersStore from '../src/Store/store'
import {addHook} from '../src/Actions/Hooks/hooks'
import {getHooksToJoinVisibility} from '../src/Visibility/Hooks/hooks'
import filterByHookText from '../src/Actions/Hooks/hooksfilter'
import { Provider } from 'react-redux'
import {addPlace} from '../src/Actions/Places/places'

 const store = ReducersStore();


 store.dispatch(addHook({ hook: "Long walk and talk",description:"A place to walk long distance"}))
 const two=store.dispatch(addHook({ hook: "Bicycle in estate", description:"come and find nice spots" }))
 const three=store.dispatch(addHook({ hook: "swimming staturday", description:"ver wonderful place to be" }))
 const four=store.dispatch(addHook({ hook: "cry on breakup", description:"come and be here now" }))
 const five=store.dispatch(addHook({ hook: "birthday spree", description:"indeed i will be there soon" }))
 const six=store.dispatch(addHook({ hook: "work-out in gym", description:"ok, am waiting for you here already" }))
 store.dispatch(addHook({hook:  "football and beer",description:"so you have gotten the big deal already"}))

 
 setTimeout(() => {
     store.dispatch(filterByHookText("b"))    
 }, 3000);

store.dispatch(addPlace({ hooks: [two.hookDetails.id,three.hookDetails.id], place_name: "Da Oasis", description: "Very nice place", image: "https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg", contact: "08018172817", createdAt: "2019-11-11T07:07:59+01:00" }))

store.dispatch(addPlace({ hooks: [three.hookDetails.id, five.hookDetails.id], place_name: "Alako Hotel", description: "A place to be on xmas", image: "https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg", contact: "08060456301", createdAt: "2019-11-11T07:14:59+01:00" }))

store.dispatch(addPlace({ hooks: [four.hookDetails.id,six.hookDetails.id], place_name: "Gabriel Spot", description: "Be here with family", image: "https://www.ahstatic.com/photos/1867_ho_00_p_1024x768.jpg", contact: "08033266514", createdAt: "2019-11-11T07:16:59+01:00" }))



const state = store.getState();

 const visibilityForHooks = getHooksToJoinVisibility(state.hookReducer, state.hookFilters)
 console.log(visibilityForHooks)


 const jsx=(
     <Provider store={store}>
         <AppRouter/>
     </Provider>
 )

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
