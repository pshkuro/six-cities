import Main from "../main/main.jsx";
import React from "react";
import PropTypes from "prop-types";

const advertCardTitleHandler = () => {};

export default function App({offers}) {
  return (
    <Main offers={offers}
      onAdvertCardTitleClick={advertCardTitleHandler}/>
  );
}

App.propTypes = {
  offers: PropTypes.array.isRequired,
};


