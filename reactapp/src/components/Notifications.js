import React, {useState} from "react";
import {useSelector} from "react-redux";
import "../Page.css";
import {vw} from "./CssUtilFunctions";

const Notifications = ({tagname="notifications"}) => {
	const notifications = useSelector(state => state.local.notification);
	const [show, setShow] = useState(notifications.map(x => false));
	const nJSX = notifications.map((notification, index) => {
		const newShow = [...show];
		newShow[index] = !newShow[index];
		return (<div className="Column" key={"nJSX" + index + "i" + JSON.stringify(notification)}>
			<div className="Row" onClick={()=> {setShow(newShow)}}>
				<div>{notification["reducer"]}</div>
				<div style={{marginLeft: vw(4)}}>{notification["action"]}</div>
			</div>
			<div onClick={()=> {setShow(newShow)}}>
			{JSON.stringify(notification["data"], null, 4).toString().split("\n").length} lines
				<pre>
				{show[index] ? JSON.stringify(notification["data"], null, 4) : ""}
				</pre>
			</div>
		</div>);
	});
	return (<div id={tagname}>
		<div style={{marginBottom: vw(2), marginTop: vw(5)}}>Session Log: {notifications.length} actions</div>
		{nJSX}
		</div>
	);
};

export default Notifications;
