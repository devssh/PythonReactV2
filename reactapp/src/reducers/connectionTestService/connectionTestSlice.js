import {randomInteger, getRequest, uuidGenerator, createReducer, joinObj} from "../ReducerUtilFunctions";
import {addNotification} from "../localService/localSlice";

const num1 = randomInteger(100);
const num2 = randomInteger(100);
const expected = num1 + num2;

const initialState = {
	"sumcheck": 0,
	"num1": num1,
	"num2": num2,
	"expected": expected,
	"uuid": uuidGenerator()
};

const newReducer = createReducer();

export const connectionTestSlice = newReducer({
  name: 'connectionTest',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRequest.pending, (state) => {
      })
      .addCase(getRequest.fulfilled, (state, action) => {
	const data = action.payload.data;
	Object.keys(data).map(key => {state[key] = data[key]});
      })
      .addCase(getRequest.rejected, (state, action) => {
	console.log("rejected promise");
	console.log(action, "error", action.error);

      })
  },
});

export const IDNAME = ["SUMCHECK"].map(x => {
	const newObj = {};
	newObj[x] = x;
	return newObj;
}).reduce(joinObj, {});


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const runTest = () => (dispatch, getState) => {
	//console.log("connectionTest");
	const state = getState().connectionTest;
	const uuid = state.uuid;
	const request = { "query": {"idname": "SUMCHECK", 
		    "reducer": "CONNECTIONTEST", 
		    "num1": state.num1, 
		    "num2": state.num2,
		    "uuid": state.uuid
		}
	};
	dispatch(getRequest(request));
	dispatch(addNotification({"data": request, "action": "SUMCHECK", "reducer": "CONNECTIONTEST"}));
	const id = setInterval(()=> {
		const rootState = getState();
                if (rootState.connectionTest[uuid] === "uuid") {
			dispatch(addNotification({"data": rootState.connectionTest, "action": "API RESPONSE " + uuid, "reducer": "FILES"
                        }));
                        clearInterval(id);
                }
        }, 500);
};

export default connectionTestSlice.reducer;
