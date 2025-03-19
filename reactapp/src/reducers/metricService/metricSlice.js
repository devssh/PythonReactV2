import {createSlice} from "@reduxjs/toolkit";
import {getRequest, createReducer} from "../ReducerUtilFunctions";

const initialState = {
	"wchello": 0,
	"message": ""
};

const newReducer = createReducer;

const metricActions = ["WCHELLO", "UPTIMEDAYS", "DISKUSAGE", "UPTIME"];
const systemMetricActions = ["DISKUSAGE", "PATH", "NETSTAT", "IFCONFIG", "PSAUX", "UNAME", "WHOAMI", "DISKFREE", "UPTIME"];

export const metricSlice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.pending, (state) => {
      })
      .addCase(getRequest.fulfilled, (state, action) => {
	const data = action.payload.data;
	Object.keys(data).map(key => {state[key] = data[key]})
      })
      .addCase(getRequest.rejected, (state, action) => {
	console.log("rejected promise");
	console.log(action, "error", action.error);

      })
  },
});


export const getMetrics = () => (dispatch, getState) => {
    //console.log("getWC");
    metricActions.map(IDNAME => {
	const request = {"query": {"idname": IDNAME, "reducer": "METRIC"}};
    	dispatch(getRequest(request));
    });
};

export const getSystemMetrics = () => (dispatch, getState) => {
    //console.log("getWC");
    systemMetricActions.map(IDNAME => {
        const request = {"query": {"idname": IDNAME, "reducer": "METRIC"}};
        dispatch(getRequest(request));
    });
};

export default metricSlice.reducer;
