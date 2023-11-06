import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import churchReducers from "./Churches/churchReducers";
import eventsReducer from "./Events/eventsReducer";
import imageReducer from "./Images/imageReducer";
import videosReducer from "./Videos/videosReducer";


const rootReducer = combineReducers({
  churches:churchReducers,
  events:eventsReducer,
  images:imageReducer,
  videos:videosReducer,
});
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;