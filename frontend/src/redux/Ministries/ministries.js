import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Helpers/ApiRequestSender";
import { BASE_URL } from "../constants";
import { GET_MINISTRIES, ADD_MINISTRY, UPDATE_MINISTRY, DELETE_MINISTRY } from "../constants";

export const fetchMinistries = createAsyncThunk(GET_MINISTRIES, async () => {
  return apiRequest(`${BASE_URL}ministry/`, 'get', null, false);
});

export const addMinistry = createAsyncThunk(ADD_MINISTRY, async (ministry) => {
  return apiRequest(`${BASE_URL}ministry/`, 'post' ,ministry);
});

export const updateMinistry = createAsyncThunk(UPDATE_MINISTRY, async (ministry) => {
  return  apiRequest(`ministry/${ministry.id}/`, "patch", ministry);
  
});

export const deleteMinistry = createAsyncThunk(DELETE_MINISTRY, async (id) => {
  await apiRequest(`ministry/${id}/`, "delete");
  return id;
});
