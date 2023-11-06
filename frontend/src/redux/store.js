import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import churchReducers from "./Churches/churchReducers";
import eventsReducer from "./Events/eventsReducer";


const rootReducer = combineReducers({
  churches:churchReducers,
  events:eventsReducer,
});
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;