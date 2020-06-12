import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import React from "react";

export default function App({advertsInfo}) {

  return (
    <Main advertsInfo={advertsInfo}/>
  );
}

App.propTypes = {
  advertsInfo: PropTypes.shape({
    advertsCount: PropTypes.number.isRequired,
    advertsDescription: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

