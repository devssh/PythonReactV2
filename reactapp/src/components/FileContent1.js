import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';

import {getFilename, getFilepath, getDirectory, getContent, setFilename, setFilepath,
        getFilesInDirectory, getFileFromPath
} from "../reducers/fetchService/fetchFilesSlice";

import ContentLine from "./ContentLine";
import Filter from "./Filter";

import {header, vw, px, border, width, height, minHeight, dark} from "./CssUtilFunctions";
import {setState, setOnChange, setOnEnter, setNow} from "./ReduxUtilFunctions";
import {onEscKeyUp} from "./ReactUtilFunctions";

const resetValue = (setter) => {
        const defaultValue="";
        setter(defaultValue);
}

function executeCommand(value, commandnotification, setCommandnotification, commandnotificationRef) {
	const notification = "" + value + " command executed";
	if (commandnotification.size === 0) {
		setCommandnotification(notification + "\n")
	}
	setCommandnotification(commandnotification.slice(0, -1) + "\n" + notification + "\n");
	commandnotificationRef.current.scrollTop = commandnotificationRef.current.scrollHeight;
}

function filterByTextPredicate(value, filterValue) {
        return value.includes(filterValue);
}

function  commandboxOnKeyUp(e, commandbox, setCommandbox, commandnotification, setCommandnotification, commandnotificationRef) {
	if (e.key === "Enter") {
		executeCommand(commandbox, commandnotification, setCommandnotification, commandnotificationRef);
		resetValue(setCommandbox);
	}
	if (e.key === "Backspace") {
		setCommandbox(commandbox.slice(0, -1));
	}
	if (commandbox.length === 0) {
		const valueSet = new Set(['/', ':', 'i', 'o', 'G', '0', '$', 'd']);
		if (valueSet.has(e.key)) {
			setCommandbox(commandbox + e.key);
		}
	}
	if (commandbox.length > 0) {
		const unacceptableValueSet = new Set(["Enter", "Backspace", "Meta", "Alt", "Control", "Shift"]);
		if (!unacceptableValueSet.has(e.key) && (e.key.length === 1)) {
			setCommandbox(commandbox + e.key);
		}
	}
}

const FileContent = () => {
	const [israw, setIsraw] = useState(false);
        const [contentfilter, setContentfilter] = useState("");
        const [commandbox, setCommandbox] = useState("");
        const [commandnotification, setCommandnotification] = useState("");

        const fileContentsCss = {...width(70, true)};
        const contentfilterCss = {...width(60), fontSize: vw(1), ...dark(), marginTop: vw(1)
	};
        const commandboxCss = {...width(60), fontSize: vw(1), ...dark(), marginTop: vw(1)
        };
	const commandnotificationCss = {...width(60), fontSize: vw(1), ...dark(), marginTop: vw(1)};
        const fileBoxCss = {...width(60), ...height(40), border: border(), padding: vw(1),
                paddingLeft: 0, paddingTop: 0, overflow: "scroll", wordWrap: "break-word", breakWord: "break-all"
        };
        const selectedColor = "royalblue";
        const fileLabelCss = {...width(5), ...height(1), marginRight: vw(2), padding: vw(0.5), fontSize: vw(1),
                backgroundColor: israw ? "inherit" : selectedColor,
                textAlign: "center"
        };
        const rawLabelCss = {...width(5), ...height(1), marginRight: vw(2), padding: vw(0.5), fontSize: vw(1),
                backgroundColor: israw ? selectedColor : "inherit",
                textAlign: "center"
        };
        const fileNameBoxCss = {...width(45), ...height(1), fontSize: vw(1), padding: vw(0.5), overflow: "hidden"};

        const dispatch = useDispatch();
        const filepath = useSelector(getFilepath);
        const filename = useSelector(getFilename);
        const directory = useSelector(getDirectory);
	const content = useSelector(getContent);
	
	const commandnotificationRef = useRef(null);
        const rawContent = JSON.stringify(content);
        const fileContentJsx = (<div className="Column ContentBox">
                {content.toString().split("\n").filter(line => filterByTextPredicate(line, contentfilter)
		).map((line, index) => <ContentLine index={index} line={line} key={"ContentLine"+index} 
			selected={false} selectEvent={()=>{}} 
			/>
		)}
        </div>);
        const contentJsx = israw ? rawContent: fileContentJsx;

	return (<div className="Column FileContents" style={fileContentsCss}>
                                <div className="Row">
                                        <div className="FileLabel" style={fileLabelCss} onClick={()=>setState(false, setIsraw)} >File</div>
                                        <div className="RawLabel" style={rawLabelCss} onClick={()=>setState(true, setIsraw)} >Raw</div>
                                        <div className="FileNameBox" style={fileNameBoxCss}>{filename}</div>
                                </div>
				<Filter filterClassName="ContentFilter" filterCss={contentfilterCss} filterValue={contentfilter} 
				onFilterChange={(e)=>{setContentfilter(e.target.value)}} 
				onFilterKeyUp={onEscKeyUp([[resetValue, [setContentfilter]]])}
				filterType="text" />
                                
				<div className="FileBox" style={fileBoxCss} >
                                        {contentJsx}
                                </div>
                                <div className="CommandDiv">
                                        <textarea className="CommandBox" style={commandboxCss} value={commandbox} placeholder="command"
                                                onKeyUp={(e) => {
							console.log(e.key);
                                                        commandboxOnKeyUp(e, commandbox, setCommandbox, 
								commandnotification, setCommandnotification, commandnotificationRef
							)
                                                }} onBlur={(e)=>{resetValue(setCommandbox)}} >
                                        </textarea>
					<textarea ref={commandnotificationRef} className="CommandNotification" style={commandnotificationCss} readOnly value={commandnotification} >
                                        </textarea>
                                </div>
		</div>
	);
}

export default FileContent;
