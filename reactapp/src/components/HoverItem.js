import React, {useState} from "react";

import {vw, px, borderColor, height, width} from "./CssUtilFunctions";

const onHover = (setState, value) => {setState(value)}

const HoverItem = ({id, classid, isdir, onFileClick, onDirClick, backbutton=false}) => {
	const [hover, setHover] = useState(false);
	const color = "royalblue";
	const dircolor = "#440077";
	const bgColor = isdir ? dircolor : color;
	const hoverItemCss = {border: borderColor(hover ? "white" : "black"), padding: vw(0.5), 
		backgroundColor: backbutton ? "inherit" : bgColor,
		...height(2), ...width(backbutton ? 80 : id.length <= 20 ? 15 : id.length * 3/4 ), 
		fontFamily: "monospace", fontSize: vw(1)
	};
	const onClick = isdir ? onDirClick : onFileClick;
	return (
		<div className={classid} style={hoverItemCss} key={id} onMouseEnter={() => {onHover(setHover, true)}} onMouseLeave={() => {onHover(setHover, false)}} onClick={onClick}>
			{id}
		</div>
	);
}

export default HoverItem;
