import React, {useEffect} from "react";
import "./Page.css";
import {useDispatch, useSelector} from "react-redux";
import {useSetOnLoad} from "./components/ReduxUtilFunctions";
import Notifications from "./components/Notifications";
import CSVViewer from "./components/CSVViewer";
import {vw} from "./components/CssUtilFunctions";

import {getSystemMetrics} from "./reducers/metricService/metricSlice";

const SystemMetrics = () => {
	const metric = useSelector(state => state.metric);
	const wchello = metric.wchello;
	const hours = parseInt(parseInt(wchello)/60)
	const dispatch = useDispatch();
	useSetOnLoad(dispatch, [[getSystemMetrics, []]]);
	const marginTopStyle={marginTop: vw(2)};
	return (
		<div className="Body">
		  <div className="Header">
			System Metrics 
		  </div>
		  <div className="Page">
		<hr/>
		<div style={marginTopStyle}>Path: {metric.path}</div>
		<hr/>
		<div style={marginTopStyle}>Whoami: {metric.whoami}</div>
		<hr/>
		<div style={marginTopStyle}>UNAME: {metric.uname}</div>
		<hr/>
		<div style={marginTopStyle}>DIRECTORY SIZE: {metric.eventserversize}</div>
		<hr/>
		<div style={marginTopStyle}>Disk Free</div>
		<CSVViewer dataTable={metric.df} separator="TABS" columns={9}/>
		<hr />
		<div>Uptime</div>
		<div>{metric.uptime}</div>
		<hr/>
		<div>NETSTAT</div>
		<CSVViewer dataTable={metric.netstat} separator="TABS" columns={1}/>
		<hr/>
		<div>IFCONFIG</div>
		<CSVViewer dataTable={metric.ifconfig} separator="TABS" columns={1}/>
		<hr/>
		<div>PS</div>
		<CSVViewer dataTable={metric.psaux} separator="TABS" columns={11}/>
		<hr/>

		  </div>

		<Notifications />
		</div>
	);
};
//loc 40hrs eventqueue activity log
export default SystemMetrics;
