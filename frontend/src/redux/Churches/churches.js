import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiRequest from "../../Helpers/ApiRequestSender";
import {
  GET_CHURCHES,
  BASE_URL,
  ADD_CHURCH,
  EDIT_CHURCH,
  DELETE_CHURCH,
  GET_CHURCH
} from "../constants";
const churchEndpoint = "church/";

export const getChurches = createAsyncThunk(GET_CHURCHES, async () => {
  const response = await apiRequest(
    `${BASE_URL}${churchEndpoint}`,
    "get",
    null,
    false
  );
  return response || [];
});

export const addChurch = createAsyncThunk(ADD_CHURCH, async (church) => {
  try {
    const formData = new FormData();
    formData.append("name", church.name);
    formData.append("about", church.about);
    formData.append("location", church.location);
    formData.append("founding_year", church.founding_year);
    formData.append("description_1", church.description_1);
    formData.append("description_2", church.description_2);
    formData.append("description_3", church.description_3);
    formData.append("mission", church.mission);
    formData.append("vision", church.vision);
    formData.append("slogan", church.slogan);
    formData.append("background_image_1", church.background_image_1);
    formData.append("background_image_2", church.background_image_2);
    formData.append("background_image_3", church.background_image_3);
    
    const response = await apiRequest(
      `${BASE_URL}${churchEndpoint}`,
      "post",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
});

export const editChurch = createAsyncThunk(EDIT_CHURCH, async (church, id) => {
  try {
    const formData = new FormData();
    formData.append("name", church.name);
    formData.append("about", church.about);
    formData.append("location", church.location);
    formData.append("founding_year", church.founding_year);
    formData.append("description_1", church.description_1);
    formData.append("description_2", church.description_2);
    formData.append("description_3", church.description_3);
    formData.append("mission", church.mission);
    formData.append("vision", church.vision);
    formData.append("slogan", church.slogan);

    if (church.background_image_1) {
      formData.append("background_image_1", church.background_image_1);
    }
    if (church.background_image_2) {
      formData.append("background_image_2", church.background_image_2);
    }

    const response = await apiRequest(
      `${BASE_URL}${churchEndpoint}/${id}`,
      "patch",
      formData
    );
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteChurch = createAsyncThunk(DELETE_CHURCH, async (id) => {
  const response = await apiRequest(
    `${BASE_URL}${churchEndpoint}/${id}`,
    "delete"
  );
  return response;
});



export const getchurch = createAsyncThunk(GET_CHURCH, async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}${churchEndpoint}${id}`);
    return response.data; // Adjust this based on your API response structure
  } catch (error) {
    throw error;
  }
});