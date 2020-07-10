import {combineReducers} from "redux";
import {reducer as offersData} from "./offers-data/offers-data.js";
import {reducer as page} from "./page/page.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: offersData,
  [NameSpace.PAGE]: page,
  [NameSpace.USER]: user,
});

