import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "redux-",
    whitelist : [],
    //blacklist : [],
}

// The code is using the combineReducers function from the Redux library to combine multiple reducers into a single root reducer.
// This allows for better organization and management of state in a Redux application.
const rootReducer = combineReducers({
    app: appReducer, 
 });
 
 export { rootPersistConfig, rootReducer};