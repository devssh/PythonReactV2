import React from "react";
import "./Page.css";

import {useDispatch, useSelector} from "react-redux";

import {header_nav} from "./components/CssUtilFunctions";

const ReduxState = () => {
	const dispatch = useDispatch();
	const appState = useSelector((state) => state);

	return (
		<div className="Body">
			{header_nav([])}
		  <div className="Page">
		     <div className="Row">
			<pre>{JSON.stringify(appState, null, 4)}</pre>
		     </div>
		  </div>
		</div>
	);
};

export default ReduxState;
