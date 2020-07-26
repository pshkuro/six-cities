import {combineReducers} from "redux";
import {reducer as offersData} from "./offers-data/offers-data";
import {reducer as page} from "./page/page";
import {reducer as user} from "./user/user";
import {reducer as reviews} from "./reviews/reviews";
import {reducer as favorites} from "./offers-favorites/offers-favorites";
import NameSpace from "./name-space";


export default combineReducers({
  [NameSpace.OFFERS_DATA]: offersData,
  [NameSpace.PAGE]: page,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: reviews,
  [NameSpace.OFFERS_FAVORITES]: favorites,
});

