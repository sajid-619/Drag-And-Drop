import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import LoadleftColumnImageState from "./leftcolumn/LeftColumnReducer";
import LoadrightColumnImageState from "./rightcolumn/RightColumnReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["LoadrightColumnImageState"], // we can add more state to our local storage
};

const rootReducer = combineReducers({
  LoadleftColumnImageState,
  LoadrightColumnImageState,
});

export default persistReducer(persistConfig, rootReducer);
