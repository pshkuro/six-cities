import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import React from "react";

const advertCardTitleHandler = () => {};

export default function App({advertsInfo}) {

  return (
    <Main advertsInfo={advertsInfo}
      onAdvertCardTitleClick={advertCardTitleHandler}/>
  );
}

App.propTypes = {
  advertsInfo: PropTypes.shape({
    advertsCount: PropTypes.number.isRequired,
    advertsDescription: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

