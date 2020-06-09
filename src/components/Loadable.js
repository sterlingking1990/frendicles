import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class Loadable extends React.Component {
    constructor(props){
        super(props);
    }
  //other logic
  render() {
    return (
    <div id="centralise">
                        <Loader
                            type="Hearts"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={3000} //3 secs
                        />
    </div>
    );
  }
}