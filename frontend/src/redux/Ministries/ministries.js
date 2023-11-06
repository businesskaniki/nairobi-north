import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Helpers/ApiRequestSender";
import { GET_MINISTRIES, ADD_MINISTRY, UPDATE_MINISTRY, DELETE_MINISTRY } from "../constants";

export const fetchMinistries = createAsyncThunk(GET_MINISTRIES, async () => {
  const response = await apiRequest("ministry/", "get",null,false); 
  return response.data || [];
});

export const addMinistry = createAsyncThunk(ADD_MINISTRY, async (ministry) => {
  const response = await apiRequest("ministry/", "post", ministry); 
  return response.data;
});

export const updateMinistry = createAsyncThunk(UPDATE_MINISTRY, async (ministry) => {
  const response = await apiRequest(`ministry/${ministry.id}/`, "patch", ministry);
  return response.data;
});

export const deleteMinistry = createAsyncThunk(DELETE_MINISTRY, async (id) => {
  await apiRequest(`ministry/${id}/`, "delete");
  return id;
});
