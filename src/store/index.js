import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { languageReducer } from "./reducers/language-reducer";
import { statisticsReducer } from "./reducers/statistics-reducer";
import { userReducer } from "./reducers/user-reducer";
import { categoryReducer } from "./reducers/category-reducer";
import { adminReducer } from "./reducers/admin-reducer";
import { subscribeReducer } from "./reducers/subscribe-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
  lang: languageReducer,
  statistics: statisticsReducer,
  user: userReducer,
  category: categoryReducer,
  admins: adminReducer,
  subscribe: subscribeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
