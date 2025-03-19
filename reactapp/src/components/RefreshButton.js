import React, {useState} from "react";

import {width, height, vw, dark, border} from "./CssUtilFunctions";
import moment from "moment";

const timeNow = () => {
	return moment().format("h:mm:ss a");
}

const onClickRefresh = (clickHandler, setter) => {
	return function() {
		setter(timeNow());
		return clickHandler();
	};
}

const RefreshButton = ({name, heightVw, clickHandler}) => {
	const [refreshTime, setRefreshTime] = useState(timeNow());
	const nameString = name + " " + refreshTime;
	const widthVw = nameString.length;
	const buttonCss = {...width(widthVw), ...height(heightVw), fontSize: vw(1), ...dark(), padding: vw(0.2), 
		textAlign: "center", marginRight: vw(1), border: border()};
	return (<div style={buttonCss} onClick={onClickRefresh(clickHandler, setRefreshTime)}>
			{nameString}
		</div>
	);
}

export default RefreshButton;

