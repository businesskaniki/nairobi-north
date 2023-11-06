import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Helpers/ApiRequestSender";
import {
  GET_IMAGES,
  BASE_URL,
  ADD_IMAGE,
  DELETE_IMAGE,
  UPDATE_IMAGE,
} from "../constants";

const imageEndpoint = "image/";

export const getImages = createAsyncThunk(GET_IMAGES, async () => {
  const response = await apiRequest(`${BASE_URL}${imageEndpoint}`, "get",null,false);
  return response || [];
});

export const addImage = createAsyncThunk(ADD_IMAGE, async (image) => {
  try {
    const formData = new FormData();
    formData.append("name", image.name);
    formData.append("description", image.description);

    if (image.file) {
      formData.append("file", image.file);
    }

    const response = await apiRequest(`${BASE_URL}${imageEndpoint}`, "post", formData);
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateImage = createAsyncThunk(UPDATE_IMAGE, async (image) => {
  try {
    const formData = new FormData();
    formData.append("name", image.name);
    formData.append("description", image.description);

    if (image.file) {
      formData.append("file", image.file);
    }

    const response = await apiRequest(`${BASE_URL}${imageEndpoint}/${image.id}`, "patch", formData);
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteImage = createAsyncThunk(DELETE_IMAGE, async (id) => {
  const response = await apiRequest(`${BASE_URL}${imageEndpoint}/${id}`, "delete");
  return response;
});