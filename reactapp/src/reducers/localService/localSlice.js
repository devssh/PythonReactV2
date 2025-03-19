import React from "react";
import { createAsyncThunk, createSlice, current} from '@reduxjs/toolkit';
import {joinObj} from "../ReducerUtilFunctions";

const initialState = {
	notification: [],
	lastnotification: {},
	filenameHistory: [],
	filepathHistory: [],
	cache: {
	}
};

const notificationFields = ["action", "reducer", "data"];

const sortObj = (obj) => {
	//one level sort only
	return Object.keys(obj).sort().map(key => {
                const newObj = {};
                newObj[key] = obj[key];
                return newObj;
        }).reduce(joinObj, {});
};

const notificationString = (notificationEle) => {
	const sortedNotificationEle = sortObj(notificationEle);
	return JSON.stringify(sortedNotificationEle);
};
const notificationEq = (n1, n2) => {
	return notificationString(n1) === notificationString(n2);
};

export const localSlice = createSlice({
  name: 'local',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const data = sortObj(action.payload);
      const currentstate = current(state);
      if ( notificationEq(currentstate.lastnotification, data) )  {
	state.notification = [...state.notification, {"reducer": "Repeat", "action": "", "data": {}}];
      }	else {
      	state.notification = [...state.notification, data];
	state.lastnotification = data;
      }
    },
    addFilename: (state, action) => {
      state.filenameHistory = [...state.filenameHistory ,action.payload];
    },
    addFilepath: (state, action) => {
      state.filepathHistory = [...state.filepathHistory ,action.payload];
    },
    setCache: (state, action) => {
	    const dataObj = action.payload;
	    Object.keys(dataObj).map(key => {
		    state.cache[key] = dataObj[key];
	    });
    }
  }
});

export const { addNotification } = localSlice.actions;

export const getCache = (state) => state.local.cache;

export const setLocalCache = (dataObj) => (dispatch, getState) => {
        const rootState = getState();
	const {setCache, addFilename, addFilepath} = localSlice.actions;
        dispatch(setCache(dataObj));
	dispatch(addNotification({"data": dataObj, "action": Object.keys(dataObj).join(","), "reducer": "LocalCache"}));
	const keys = Object.keys(dataObj);
	keys.filter(key => key.startsWith("filename")).map(key => {
		const newobj = {};
		newobj[key] = dataObj[key];
		dispatch(addFilename(newobj));
	});
	keys.filter(key => key.startsWith("filepath")).map(key => {
                const newobj = {};
                newobj[key] = dataObj[key];
                dispatch(addFilepath(newobj));
        });
};

export default localSlice.reducer;
