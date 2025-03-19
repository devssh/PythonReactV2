import {createSlice} from "@reduxjs/toolkit";
import {getRequest, createReducer} from "../ReducerUtilFunctions";

const initialState = {
	test: ""
};

const newReducer = createReducer;

export const sampleSlice = createSlice({
  name: 'sampleSlice',
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.test = action.payload;
    }
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

export const { setTest } = sampleSlice.actions;

// Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getTest = (state) => state.sample.test;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const getTestAuto = () => (dispatch, getState) => {
    //console.log("getFilesInDirectory");
    const rootState = getState();
    const test = rootState.sample.test;
    const request = {"query": {}};
    dispatch(getRequest(request));
};

export default sampleSlice.reducer;
