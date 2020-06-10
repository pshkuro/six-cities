import React from "react";
import Main from "../main/main.jsx";

export default function App(props) {
  // eslint-disable-next-line react/prop-types
  const {advertsCount} = props;

  return (
    <Main advertsCount={advertsCount}/>
  );
}
