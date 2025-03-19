import {v4} from "uuid";
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

import fetchRequest from "./networkService/networkAPI";

export const randomInteger = (end, start=0) => {
	return start + Math.floor(Math.random() * end);
};

export const getRequest = createAsyncThunk(
  'getRequest',
  async (request) => {
    //console.log("getRequest");
    const response = await fetchRequest(request);
    return response.json();
  }
);

export const uuidGenerator = () => {
	return v4();
};

export const createReducer = () => {
	return createSlice;
};

export const currentResolution = () => {
	return current;
};

export const joinObj = (acc, ele) => {
        return {...acc, ...ele};
};

export const logicalAnd = (acc, ele) => acc && ele;
