// actions/prayerRequests.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../Helpers/ApiRequestSender';
import { BASE_URL } from '../constants';
import {
  GET_PRAYER_REQUESTS,
  ADD_PRAYER_REQUEST,
  DELETE_PRAYER_REQUEST,
  EDIT_PRAYER_REQUEST,
} from '../constants';


  export const fetchPrayerRequests = createAsyncThunk(GET_PRAYER_REQUESTS, async () => {
    return apiRequest(`${BASE_URL}prayer-request/`, 'get', null, false);
  });

  export const addPrayerRequest = createAsyncThunk(ADD_PRAYER_REQUEST, async (prayerRequest) => {
    return apiRequest(`${BASE_URL}prayer-request/`, 'post', prayerRequest);
  });

  export const editPrayerRequest = createAsyncThunk(EDIT_PRAYER_REQUEST, async (prayerRequest, id) => {
    return apiRequest(`${BASE_URL}prayer-request/${id}`, 'patch', prayerRequest);
  });

  export const deletePrayerRequest = createAsyncThunk(DELETE_PRAYER_REQUEST, async (id) => {
    return apiRequest(`${BASE_URL}prayer-request/${id}`, 'delete');
  });
