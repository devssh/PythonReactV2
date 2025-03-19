import React, {useEffect} from "react";
import {getFile} from "../reducers/filesService/filesSlice";
import {execute} from "../reducers/networkService/networkSlice";

const setState = (value, setter) => {
        return setter(value);
}

function setNow(dispatch, dispatchMethod, args) {
	if (args.length === 0) {
        	dispatch(dispatchMethod());
	}
	dispatch(dispatchMethod(...args));
}

function dispatchCall(dispatch, call) {
	const dispatchMethod = call[0];
        const valueArgs = call[1];
        setNow(dispatch, dispatchMethod, valueArgs);
}

function dispatchAsync(dispatch, calls) {
	calls.map(call => {
		dispatchCall(dispatch, call);
        });
}

function dispatchSync(dispatch, calls) {
	if (calls.length > 1) {
		const lock = new Promise((resolve, reject) => {
			dispatchCall(dispatch, calls[0]);
			resolve();
		});
		lock.finally(() => {
			const waitingCalls = calls.slice(1);
			dispatchSync(dispatch, waitingCalls);
		})
	} else {
		dispatchCall(dispatch, calls[0]);
	}
}

function simpleSetOnChange(dispatch, call) {
	const setter = call[0];
	const arg = call[1];
	return function(e) {
		dispatch(setter({arg: e.target.value}));
	};
}

function setOnChange(dispatch, calls) {
	dispatchAsync(dispatch, calls);
}

function setWithReady(dispatch, calls, ready, setReady) {
	if (!ready) {
		dispatchSync(dispatch, calls);
		setReady(true);
	}
}

function useSetOnLoad(dispatch, calls, dependency=[]) {
	useEffect(()=>{
			dispatchSync(dispatch, calls);
	}, dependency);
}

export const executeCommand = (dispatch, code) => {
        if (code==="restart") {
                return function() {
                        dispatch(execute({"idname": "RESTART"}));
                };
        }
	if (code==="follow") {
		return function() {
			dispatch(getFile({"idname": "READFILE", 
				"filename": "/Users/devssh/EventServer/Codebase/PythonReact/runlog.txt"
			}));
			dispatch(getFile({"idname": "READFILE", 
				"filename": "/Users/devssh/EventServer/Codebase/PythonReact/reactapp/runlog.txt"
			}));
		};
	}
}



export {setState, setOnChange, simpleSetOnChange, useSetOnLoad, setNow, setWithReady};
