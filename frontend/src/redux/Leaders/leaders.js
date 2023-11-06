// actions/churchOfficials.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../Helpers/ApiRequestSender";
import { BASE_URL } from "../constants";
import {
  GET_CHURCH_OFFICIALS,
  ADD_CHURCH_OFFICIAL,
  DELETE_CHURCH_OFFICIAL,
  EDIT_CHURCH_OFFICIAL,
} from "../constants";

export const fetchChurchOfficials = createAsyncThunk(
  GET_CHURCH_OFFICIALS,
  async () => {
    return apiRequest(`${BASE_URL}church-official/`, "get",null,false);
  }
);

export const addChurchOfficial = createAsyncThunk(
  ADD_CHURCH_OFFICIAL,
  async (churchOfficial) => {
    return apiRequest(`${BASE_URL}church-official/`, "post", churchOfficial);
  }
);

export const editChurchOfficial = createAsyncThunk(
  EDIT_CHURCH_OFFICIAL,
  async (churchOfficial, id) => {
    return apiRequest(
      `${BASE_URL}church-official/${id}`,
      "patch",
      churchOfficial
    );
  }
);

export const deleteChurchOfficial = createAsyncThunk(
  DELETE_CHURCH_OFFICIAL,
  async (id) => {
    return apiRequest(`${BASE_URL}church-official/${id}`, "delete");
  }
);
