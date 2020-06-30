import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import {nearOffers} from "./mocks/near-offers.js";
import {reducer} from "./redux/reducer.js";

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f);

ReactDom.render(
    <Provider store={store}>
      <App
        nearOffers={nearOffers}/>
    </Provider>,
    document.querySelector(`#root`)
);


