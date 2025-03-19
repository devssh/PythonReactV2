import React, {useState, useEffect} from "react";

import {width, height, vw, dark, border} from "./CssUtilFunctions";
import moment from "moment";

function restart(clickHandler, setter) {
	return clickHandler;
}

const RestartButton = ({ heightVw, clickHandler}) => {
	const [start, setStart] = useState(false);
	const [name, setName] = useState("Restart");
	const widthVw = name.length;
	const buttonCss = {...width(widthVw), ...height(heightVw), fontSize: vw(1), ...dark(), padding: vw(0.2), 
		textAlign: "center", marginRight: vw(1), border: border()};
	useEffect(()=>{
        	const id = setInterval(()=>{
				if (start) {
                			const timer = 60 - parseInt(moment().format("ss"));
                			setName("Restarting in " + timer.toString() + "...");
					if (timer === 5) {
						clickHandler();
					}
					if (timer === 1 ) {
						setStart(false);
						setName("Restart");
					}
				}
        		   }, 1000);
                return ()=> clearInterval(id);
        }, [start]);

	return (<div style={buttonCss} onClick={()=>{
		setStart(true);	
	}}>
			{name}
		</div>
	);
}

export default RestartButton;

