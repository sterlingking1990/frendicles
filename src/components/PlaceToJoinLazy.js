import loadable from "@loadable/component";
import Loadable from "./Loadable.js";
import React from "react";

const LoadableComponent = loadable(() => import("./PlacesToJoinFB.js"), {
  fallback: <Loadable />
});

class PlaceToJoinLazy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoadableComponent />;
  }
}

export default PlaceToJoinLazy;
