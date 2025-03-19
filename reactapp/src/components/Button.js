import React from "react";

import {width, height, vw, dark, border} from "./CssUtilFunctions";

const Button = ({name, widthVw, heightVw, clickHandler}) => {
	const buttonCss = {...width(widthVw), ...height(heightVw), fontSize: vw(1), ...dark(), padding: vw(0.2), 
		textAlign: "center", marginRight: vw(1), border: border()};
	return (<div style={buttonCss} onClick={clickHandler}>
			{name}
		</div>
	);
}

export default Button;

