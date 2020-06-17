import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import React from "react";
import {offers} from "../../mocks/offers.js";

const advertCardTitleHandler = () => {};

export default function App() {
  return (
    <Main offers={offers}
      onAdvertCardTitleClick={advertCardTitleHandler}/>
  );
}


