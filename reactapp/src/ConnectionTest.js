import React, { useState, useEffect } from "react";
import "./Page.css";
import { useSelector, useDispatch } from 'react-redux';
import { runTest } from "./reducers/connectionTestService/connectionTestSlice";
import {useSetOnLoad} from "./components/ReduxUtilFunctions";
import Notifications from "./components/Notifications";

const ConnectionTest = () => {
	const connectionTest = useSelector(state => state.connectionTest);
	const dispatch = useDispatch();
	const actions = {"runTest": [runTest, [] ]};
	useSetOnLoad(dispatch, [actions.runTest]);
	return (
		<div className="Body">
		  <div className="Header">
			ConnectionTest 
		  </div>
		  <div className="Page">
			
		     <div>Connection Test</div>
		     <div><pre>{JSON.stringify(connectionTest, null, 4)}</pre></div>
		     <Notifications />
		  </div>
		</div>
	);
};
//eventqueue
export default ConnectionTest;

