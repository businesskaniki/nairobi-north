// actions/events.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../constants';
import { GET_EVENT, ADD_EVENT, DELETE_EVENT, EDIT_EVENT } from '../constants';
import apiRequest from '../../Helpers/ApiRequestSender';

export const fetchEvents = createAsyncThunk(GET_EVENT, async () => {
  return apiRequest(`${BASE_URL}event/`, 'get', null, false);
});

export const addEvent = createAsyncThunk(ADD_EVENT, async (event, id) => {
  return apiRequest(`${BASE_URL}event/${id}`, 'post', event);
});

export const editEvent = createAsyncThunk(EDIT_EVENT, async (event, id) => {
  return apiRequest(`${BASE_URL}event/${id}`, 'patch', event);
});

export const deleteEvent = createAsyncThunk(DELETE_EVENT, async (id) => {
  return apiRequest(`${BASE_URL}event/${id}`, 'delete');
});
