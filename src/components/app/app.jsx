import Main from "../main/main.jsx";
import React from "react";
import {offers} from "../../mocks/offers.js";

const advertCardTitleHandler = () => {};

export default function App() {
  return (
    <Main offers={offers}
      onAdvertCardTitleClick={advertCardTitleHandler}/>
  );
}

