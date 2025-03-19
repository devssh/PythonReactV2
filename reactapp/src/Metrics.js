import React, {useEffect} from "react";
import "./Page.css";
import {useDispatch, useSelector} from "react-redux";
import {useSetOnLoad} from "./components/ReduxUtilFunctions";
import {vw} from "./components/CssUtilFunctions";

import Notifications from "./components/Notifications";
import CSVViewer from "./components/CSVViewer";
import UptimeDays from "./components/UptimeDays";

import {getMetrics} from "./reducers/metricService/metricSlice";

const Metrics = () => {
	const metric = useSelector(state => state.metric);
	const wchello = metric.wchello;
	const hours = parseInt(parseInt(wchello)/60)
	const dispatch = useDispatch();
	useSetOnLoad(dispatch, [[getMetrics, []]]);
	const marginTopStyle={marginTop: vw(2)};
	return (
		<div className="Body">
		  <div className="Header">
			Metrics 
		  </div>
		  <div className="Page">
		     <div>WC Hello</div>
		     <div>{hours} hours</div>
		     <div>{parseInt(hours/8)} work days</div>
		     <div>{parseInt(hours/40)} work weeks</div>
		     <div>{parseInt(hours/24)} days</div>
		<hr/>
		<div style={marginTopStyle}>Uptime days: 
		<UptimeDays uptimedays={metric.uptimedays}/>
		<pre>{JSON.stringify(metric.uptimedays, null, 4)}</pre>
		</div>
		<hr/>
		<div style={marginTopStyle}>DIRECTORY SIZE: {metric.eventserversize}</div>
		<hr/>
		<div>Uptime</div>
		<div>{metric.uptime}</div>
		<hr/>

		  </div>

		<Notifications />
		</div>
	);
};
//loc 40hrs eventqueue activity log
export default Metrics;
