import * as React from "react";
import * as ReactDom from "react-dom";
import {applyMiddleware} from "redux";
import {createAPI} from "./api/api";
import {createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app";
import {ActionCreator, AuthorizationStatus, Operation as UserOperation} from "./redux/user/user";
import {Operation as DataOperation} from "./redux/offers-data/offers-data";
import reducer from "./redux/reducers";

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


