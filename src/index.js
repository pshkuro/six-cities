import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const Info = {
  ADVERTS_COUNT: 152,
};

ReactDom.render(
    <App advertsCount={Info.ADVERTS_COUNT}/>,
    document.querySelector(`#root`)
);
