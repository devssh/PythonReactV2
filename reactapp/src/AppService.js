import React, {useState} from "react";
import "./Page.css";
import {useDispatch, useSelector} from "react-redux";

import {header_nav, vw} from "./components/CssUtilFunctions";
import ReadOnlyFileContent from "./components/ReadOnlyFileContent";
import Button from "./components/Button";
import RestartButton from "./components/RestartButton";
import RefreshButton from "./components/RefreshButton";
import FollowButton from "./components/FollowButton";
import {redirect} from "./components/ReactUtilFunctions";
import {executeCommand, useSetOnLoad} from "./components/ReduxUtilFunctions";
import {setLocalCache} from "./reducers/localService/localSlice";

const AppService = () => {
	const dispatch = useDispatch();
	const cache = useSelector(state => state.local.cache);
	useSetOnLoad(dispatch, [[setLocalCache, [{"filename2": "/Users/devssh/EventServer/Codebase/PythonReact/runlog.txt", 
		"filepath2": "/Users/devssh/EventServer/Codebase/PythonReact/",
		"filename3": "/Users/devssh/EventServer/Codebase/PythonReact/reactapp/runlog.txt",
		"filepath3": "/Users/devssh/EventServer/Codebase/PythonReact/reactapp/"
	}]]]);
	return (
		<div className="Body">
		{header_nav(["#pythonlog", "#reactlog"])}
		  <div className="Page">
		     <div className="Column">
			<div className="Row" id="pythonlog"></div>
			<div className="Row" style={{marginTop: vw(5)}}>
			<RefreshButton name="Refresh" heightVw={1.5} clickHandler={redirect("/appService")} key={"refresh"}/>
			<FollowButton name="Follow" widthVw={6} heightVw={1.5} clickHandler={executeCommand(dispatch, "follow")} 
			key={"follow"}/>
			<RestartButton heightVw={1.5} clickHandler={executeCommand(dispatch, "restart")} key={"restart"}/>
			</div>
                        <ReadOnlyFileContent tagname={"pythonlogbottom"} N={2} key={"pythonlog"}/>
                        <ReadOnlyFileContent tagname={"reactlog"} N={3} key={"reactlog"}/>
		     </div>
		  </div>
		</div>
	);
};

export default AppService;
