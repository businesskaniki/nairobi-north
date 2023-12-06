import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import churchReducers from "./Churches/churchReducers";
import eventsReducer from "./Events/eventsReducer";
import imageReducer from "./Images/imageReducer";
import videosReducer from "./Videos/videosReducer";
import ministriesReducer from "./Ministries/ministriesReducer";
import prayeReducer from "./prayerRequests/prayeReducer";
import sermonsReducer from "./Sermons/sermonsReducer";
import addchurchReducer from "./Churches/addchurchReducer";

const rootReducer = combineReducers({
  churches: churchReducers,
  addchurch: addchurchReducer,
  events: eventsReducer,
  images: imageReducer,
  videos: videosReducer,
  ministries: ministriesReducer,
  prayers: prayeReducer,
  sermoms: sermonsReducer,
});
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });

export default store;
