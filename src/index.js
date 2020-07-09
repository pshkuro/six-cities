import React from "react";
import ReactDom from "react-dom";
import {createStore} from "redux";
import {applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {createAPI} from "./api/api.js";
import App from "./components/app/app.jsx";
import {Operation as DataOperation} from "./reducer/data/data.js";
import {Operation as UserOperation} from "./reducer/user/user.js";
import {ActionCreator, AuthorizationStatus} from "./reducer/user/user.js";
import reducer from "./reducer/reducer.js";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(DataOperation.getOffers());
store.dispatch(UserOperation.checkAuth());


ReactDom.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);


