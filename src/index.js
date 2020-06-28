import App from "./components/app/app.jsx";
import {offers} from "./mocks/offers.js";
import {nearOffers} from "./mocks/near-offers.js";
import React from "react";
import ReactDom from "react-dom";


ReactDom.render(
    <App offers={offers}
      nearOffers={nearOffers}/>,
    document.querySelector(`#root`)
);


