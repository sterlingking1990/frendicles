import loadable from "@loadable/component";
import Loadable from "./Loadable.js";
import React from 'react';

const LoadableComponent = loadable(()=>import("./Dashboard.js"),{
    fallback:<Loadable/>
})

class LoadableDashboard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <LoadableComponent/>
    }
}

export default LoadableDashboard;