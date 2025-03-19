import React, {useState} from "react";

import {width, height, vw, dark, border} from "./CssUtilFunctions";

const onClickFollow = (clickHandler, setter, value, idSetter, idValue) => {
	return function() {
		setter(!value);
		if (value) {
			clearInterval(idValue);
		}
		const id = setInterval(()=>{
			if (!value) {
				clickHandler();
			}
		}, 5000);
		idSetter(id);
	}
}
//dispatch, [[getFile, [filepath, filename, logtype]]]
const FollowButton = ({name, widthVw, heightVw, clickHandler}) => {
	const [follow, setFollow] = useState(false);
	const [clearId, setClearId] = useState(null);

	const buttonCss = {...width(widthVw), ...height(heightVw), fontSize: vw(1), ...dark(), padding: vw(0.2), 
		textAlign: "center", marginRight: vw(1), border: border()};
	if (follow) {
		buttonCss["backgroundColor"] = "green";
	}
	return (<div style={buttonCss} onClick={onClickFollow(clickHandler, setFollow, follow, setClearId, clearId)}>
			{name}
		</div>
	);
}

export default FollowButton;

