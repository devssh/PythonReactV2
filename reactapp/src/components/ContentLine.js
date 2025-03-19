import React, {useState} from "react";

import {vw, border, width, px, height, borderColor, dark} from "./CssUtilFunctions";

const ndigitIndex = (index) => {
	let ndI = index.toString();
	let n = 7;
	const ndILength = ndI.length;
	if (ndILength < n) {
		return " ".repeat((n - (ndILength+1))) + ndI;
	}
	return ndI;
}

const quote = (somestr) => {
	return "\'" + somestr + "\'";
}

const substringRows = (value, rownum, maxchars, viewNumber) => {
	return value.substring(maxchars*rownum, maxchars*(rownum+1));
}

const onClickViewNumber = (setterView, current, setterEdit, line) => {
	return function() {
		const viewNumber = (current + 1) % 4;
		setterView(viewNumber);
		if (viewNumber === 0) {
                	setterEdit(line);
        	}
        	if (viewNumber === 1) {
                	setterEdit(quote(line));
       		}
        	if (viewNumber === 2) {
                	setterEdit(line.split("").map(x=>quote(x)).join(","));
        	} 
		if (viewNumber === 3) {
        		setterEdit(line.split("").map(x=> quote(x) + x.charCodeAt().toString()).join(","));
		}
	}
}

const ContentLine = ({index, line, selected=false}) => {
	const [viewNumber, setViewNumber] = useState(0);
	const [lineEdit, setLineEdit] = useState(line);
	const selectedColor = "royalblue";
	const maxLineWidth = 130;
	const widthOfLineVw = 84;
	const rows = 1 + parseInt(lineEdit.length/maxLineWidth);
	const calculatedHeight = 1.5;
	const calculatedHeightInput = calculatedHeight - 0.4;

	const lineNumberCss = {border: border(), ...width(4.5),
                fontSize: vw(1), ...height(calculatedHeight*rows), fontFamily: "monospace"
        };
        
	const lineContentCss = {border: selected ? borderColor(selectedColor): border(), ...width(widthOfLineVw + 0.5),
		fontSize: vw(1), ...height(calculatedHeight*rows), fontFamily: "monospace"
	};
        
	const lineNumberBoxCss = {...width(4), ...dark(), fontSize: vw(1), 
		...height(calculatedHeightInput), fontFamily: "monospace"
	};
        
	const lineContentBoxCss = {...width(widthOfLineVw), ...dark(), fontSize: vw(1), 
		...height(calculatedHeightInput), fontFamily: "monospace"
	};

	const lineStatewise = [...Array(rows).keys()].map(x => substringRows(lineEdit, x, maxLineWidth, viewNumber));
	const lineContentJsx = lineStatewise.map(lineHTML => {
		return (<input style={lineContentBoxCss} 
		key={"LineContentRow" + index+"i"+lineHTML+"lHTML"}
		value={lineStatewise.length === 1 ? lineHTML : lineHTML + "↵"} readOnly>
		</input>
	)});

	return (<div className="Row ContentLine" key={"LineNumber"+index+"i"+line}>
                        <div className="LineNumber" style={lineNumberCss}>
                                <input style={lineNumberBoxCss} value={ndigitIndex(index)} readOnly 
				onClick={onClickViewNumber(setViewNumber, viewNumber, setLineEdit, line)}>
				</input>
			</div>
                        <div className="LineContent" style={lineContentCss}>
				{lineContentJsx}
                        </div>
                        
		</div>
	);
}

export default ContentLine;
