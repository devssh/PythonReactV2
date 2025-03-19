import React from "react";
import {addNotification} from "../localService/localSlice";
import {getRequest, uuidGenerator, createReducer, logicalAnd} from "../ReducerUtilFunctions";

const initialState = {
	cache: {
		tablenames: [],
		tablesinfo: [],
		columnsinfo: []
	},
	message: ""
};

const POST = "POST";

const newReducer = createReducer();

export const databaseSlice = newReducer({
  name: 'database',
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
		if (data[key] === "uuid") {
			state[key]="uuid";
		} else {
			const isObject = typeof(data[key]) === "object";
			if (isObject) {
				const isTableData = data[key].datatype === "tabledata";
				if (isTableData) {
					const currentData = typeof(state.cache[key])==="object" ? state.cache[key] : {}
					state.cache[key] = {...currentData, ...data[key]};
				} else {
					state.cache[key] = data[key];
				}
			} else {
				state.cache[key] = data[key];
			}
		}
	});
      })
      .addCase(getRequest.rejected, (state, action) => {
	console.log("rejected promise");
	console.log(action, "error", action.error);

      })
  },
});

const reducerName = ["DATABASE"];

const getResult = (uuid, query, dispatch, getState) => {
	const request = {"url": "/api/execute", "method": POST, "query": {...query, "reducer": "DATABASE", "uuid": uuid}};
	dispatch(getRequest(request));
	dispatch(addNotification({"data": request, "action": query["idname"], "reducer": "DATABASE"}));
};

//example of Synchronous dispatch with lock
export const getResults = (queries) => (dispatch, getState) => {
	const ready = queries.map(query => {
		return Object.keys(query).map(key => query[key]!=="Loading...").reduce(logicalAnd, true)
	}).reduce(logicalAnd, true);
	
	const timeDelay = 300;
	let currentQuery = 0;
	let queryLock = false;
	if (ready) {

	const loopId = setInterval(()=> {
		if (currentQuery >= queries.length) {
			clearInterval(loopId);
		} else if (!queryLock) {
			const uuid = uuidGenerator();
			getResult(uuid, queries[currentQuery], dispatch, getState);
			const id = setInterval(()=> {
				const rootState = getState();
        			if (rootState.database[uuid] === "uuid") {
                			dispatch(addNotification({"data": rootState.database, 
						"action": "API RESPONSE " + uuid, "reducer": "DATABASE"
					}));
					currentQuery = currentQuery + 1;
					queryLock = false;
                			clearInterval(id);
                		}
			}, timeDelay);
			queryLock = true;
		}
	}, timeDelay);
	
	}
	
}

export default databaseSlice.reducer;
