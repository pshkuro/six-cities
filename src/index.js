import React from "react";
import ReactDom from "react-dom";
import App from "./components/app/app.jsx";

const AdvertsInfo = {
  advertsCount: 152,
  advertsDescription: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
};

ReactDom.render(
    <App advertsInfo={AdvertsInfo}/>,
    document.querySelector(`#root`)
);
