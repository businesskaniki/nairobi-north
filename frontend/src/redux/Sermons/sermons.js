// actions/sermons.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../Helpers/ApiRequestSender';
import { BASE_URL } from '../constants';
import {
  GET_SERMONS,
  ADD_SERMON,
  DELETE_SERMON,
  EDIT_SERMON,
} from '../constants';


  export const fetchSermons = createAsyncThunk(GET_SERMONS, async () => {
    return apiRequest(`${BASE_URL}sermon/`, 'get', null,false);
  });

  export const addSermon = createAsyncThunk(ADD_SERMON, async (sermon) => {
    return apiRequest(`${BASE_URL}sermon/`, 'post', sermon);
  });

  export const editSermon = createAsyncThunk(
    EDIT_SERMON,
    async (sermon, id) => {
      return apiRequest(`${BASE_URL}sermon/${id}`, 'patch', sermon);
    }
  );

  export const deleteSermon = createAsyncThunk(
    DELETE_SERMON,
    async (id) => {
      return apiRequest(`${BASE_URL}sermon/${id}`, 'delete');
    }
  );
