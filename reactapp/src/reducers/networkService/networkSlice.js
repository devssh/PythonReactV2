import React, {lazy} from "react";
import {createSlice} from "@reduxjs/toolkit";
import {getRequest, createReducer} from "../ReducerUtilFunctions";

const initialState = {
	cache: {message: ""}
};

const getNetworkRequest = getRequest;
const newReducer = createReducer;

export const networkSlice = createSlice({
  name: 'network',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNetworkRequest.pending, (state) => {
      })
      .addCase(getNetworkRequest.fulfilled, (state, action) => {
	const data = action.payload.data;
	Object.keys(data).map(key => {state.cache[key] = data[key]})
      })
      .addCase(getNetworkRequest.rejected, (state, action) => {
	console.log("rejected promise");
	console.log(action, "error", action.error);

      })
  },
});

export const getNetworkCache = (state) => state.network.cache;

export const execute = (query) => (dispatch, getState) => {
        const rootState = getState();
	//console.log("network execute", query);
        const request = {"query": {...query, "reducer": "NETWORK"} };
        dispatch(getNetworkRequest(request));
};

export default networkSlice.reducer;
