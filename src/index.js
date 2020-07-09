import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api/api.js";
import App from "./components/app/app.jsx";
import {Operation as DataOperation} from "./redux/offersData/offersData.js";
import {ActionCreator, AuthorizationStatus} from "./redux/user/user.js";
import reducer from "./redux/reducers.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(DataOperation.getOffers());

ReactDom.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);


