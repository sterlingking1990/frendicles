import loadable from "@loadable/component";
import Loadable from "./Loadable.js";
import React from "react";

const LoadableComponent = loadable(() => import("./LandingPage.js"), {
  fallback: <Loadable />
});

class LoadableHome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoadableComponent />;
  }
}

export default LoadableHome;
