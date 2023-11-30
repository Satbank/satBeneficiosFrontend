import { combineReducers } from "redux";
import loadingReducer from "./loading.reducer";
import notifyReducer from "./notify.reducer"
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import { loginReducer } from "./LoginReducer";

const rootReducer = combineReducers({
    loadingReducer,   notifyReducer, alertReducer, authReducer, loginReducer
});

export default rootReducer;