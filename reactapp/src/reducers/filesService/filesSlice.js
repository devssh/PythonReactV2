import React, {lazy} from "react";
import {addNotification} from "../localService/localSlice";
import {getRequest, uuidGenerator, createReducer, logicalAnd} from "../ReducerUtilFunctions";

const initialState = {
	cache: {
		directory: {}
	}
};

const POST = "POST";

const newReducer = createReducer();

export const filesSlice = newReducer({
  name: 'files',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.pending, (state) => {
      })
      .addCase(getRequest.fulfilled, (state, action) => {
	const data = action.payload.data;
	Object.keys(data).map(key => {
		if (key === "directory") {
			Object.keys(data[key]).map(dirkey => {
				state.cache.directory[dirkey]=data[key][dirkey];
			}); 
		} else if (data[key] === "uuid") {
			state[key]="uuid";
		} else {
			state.cache[key] = data[key];
		}
	});
      })
      .addCase(getRequest.rejected, (state, action) => {
	console.log("rejected promise");
	console.log(action, "error", action.error);

      })
  },
});


// Se can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getDirectory = (state) => state.files.cache.directory;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.


export const getFile = (query) => (dispatch, getState) => {
	const uuid = uuidGenerator();
	const request = {"url": "/api/execute", "method": POST, "query": {...query, "reducer": "FILES", "uuid": uuid}};
	if (Object.keys(query).map(key => query[key]!=="Loading...").reduce(logicalAnd, true)) {
		dispatch(getRequest(request));
		dispatch(addNotification({"data": request, "action": query["idname"], "reducer": "FILES"}));
		const id = setInterval(()=> {
			const rootState = getState();
			if (rootState.files[uuid] === "uuid") {
				dispatch(addNotification({"data": rootState.files, "action": "API RESPONSE " + uuid, "reducer": "FILES"
				}));
				clearInterval(id);
			}
		}, 500);
	}
};

export default filesSlice.reducer;
