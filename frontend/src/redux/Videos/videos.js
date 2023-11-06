import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Helpers/ApiRequestSender";
import {
  GET_VIDEOS,
  BASE_URL,
  ADD_VIDEO,
  DELETE_VIDEO,
  UPDATE_VIDEO,
} from "../constants";

const videoEndpoint = "video/";

export const getVideos = createAsyncThunk(GET_VIDEOS, async () => {
  const response = await apiRequest(`${BASE_URL}${videoEndpoint}`, "get",null,false);
  return response || [];
});

export const addVideo = createAsyncThunk(ADD_VIDEO, async (video) => {
  try {
    const formData = new FormData();
    formData.append("name", video.name);
    formData.append("description", video.description);

    if (video.file) {
      formData.append("file", video.file);
    }

    const response = await apiRequest(`${BASE_URL}${videoEndpoint}`, "post", formData);
    return response;
  } catch (error) {
    throw error;
  }
});

export const updateVideo = createAsyncThunk(UPDATE_VIDEO, async (video) => {
  try {
    const formData = new FormData();
    formData.append("name", video.name);
    formData.append("description", video.description);

    if (video.file) {
      formData.append("file", video.file);
    }

    const response = await apiRequest(`${BASE_URL}${videoEndpoint}/${video.id}`, "patch", formData);
    return response;
  } catch (error) {
    throw error;
  }
});

export const deleteVideo = createAsyncThunk(DELETE_VIDEO, async (id) => {
  const response = await apiRequest(`${BASE_URL}${videoEndpoint}/${id}`, "delete");
  return response;
});