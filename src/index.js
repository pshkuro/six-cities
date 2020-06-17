import App from "./components/app/app.jsx";
import {offers} from "./mocks/offers.js";
import React from "react";
import ReactDom from "react-dom";

const AdvertsInfo = {
  advertsCount: 152,
  advertsDescription: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
};
console.log(offers);


ReactDom.render(
    <App advertsInfo={AdvertsInfo}/>,
    document.querySelector(`#root`)
);
