import React, {useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';

import {getFile} from "../reducers/filesService/filesSlice";
import {setLocalCache} from "../reducers/localService/localSlice";

import ContentLine from "./ContentLine";
import Filter from "./Filter";

import {header, vw, px, border, width, height, minHeight, dark} from "./CssUtilFunctions";
import {setState, setOnChange, setOnEnter, setNow, useSetOnLoad} from "./ReduxUtilFunctions";
import {onEscKeyUp, returnEfunc, returnFunc, EffectDepends, EffectTimer, scrollDivOn, checkKeys} from "./ReactUtilFunctions";

const resetValue = (setter) => {
        const defaultValue="";
        setter(defaultValue);
}

function filterByTextPredicate(value, filterValue) {
        return value.includes(filterValue);
}

const ReadOnlyFileContent = ({tagname, N=1}) => {
	const [israw, setIsraw] = useState(false);
        const [contentfilter, setContentfilter] = useState("");
	const scrollContent = useRef(null);

        const fileContentsCss = {...width(90, true), marginBottom: vw(1), marginTop: vw(5)};
        const contentfilterCss = {...width(90), fontSize: vw(1), ...dark(), marginTop: vw(1), marginBottom: vw(1), ...height(2)
	};
        const fileBoxCss = {...width(90), ...height(42), border: border(), padding: vw(1),
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

        const fileNameBoxCss = {...width(70), ...height(1), fontSize: vw(1), padding: vw(0.5), overflow: "hidden"};
        
	const dispatch = useDispatch();
	const localCache = useSelector(state => state.local.cache);
	const fileCache = useSelector(state => state.files.cache);
	
	const filenameN = "filename" + N; 
	const filepathN = "filepath" + N;
	const loading = "Loading...";
	const cacheReady = checkKeys(localCache, [filenameN, filepathN]);
	const filename = cacheReady ? localCache[filenameN] : loading;
	const filepath = cacheReady ? localCache[filepathN] : loading;

	const fileReady = checkKeys(fileCache, [filename]);
	const placeholderFile = {"data": loading, "start": 0, "end": 1000, "total": 1000};
	const fileContent = fileReady ? fileCache[filename] : placeholderFile;
        const data = fileContent.data;
	const start = fileContent.start;
	const end = fileContent.end;
	const total = fileContent.total;
	
	const rawContent = fileReady ? Object.values(data).join("") : loading;
        const fileContentJsx = fileReady ? (<div className="Column ContentBox">
                {rawContent.split("\n").filter(line => filterByTextPredicate(line, contentfilter)
		).map((line, index) => <ContentLine index={index + start} line={line} 
			key={tagname + "ContentLineOf" + index + "i" + start + "s" + N+"n"+contentfilter} 
			selected={false} selectEvent={()=>{}}
			/>
		)}
        </div>) : loading;

        const contentJsx = israw ? JSON.stringify(rawContent): fileContentJsx;

	useSetOnLoad(dispatch, [[getFile, [{"idname": "READFILE", "filename": filename}]]], [filename]);

	const effectDependsJsx = (<EffectDepends methodCall={scrollDivOn()} 
		args={[scrollContent, rawContent.split("\n")]} 
		dependency={[rawContent]}
		key={"effectdepends" + N + "n" + tagname}
		/>);
	
	const filenameTokens = filename.split("/");
	const fileDetails = filenameTokens.slice(0, -1).join("/") + "/ " + filenameTokens.slice(-1)  +
		" total: " + total + " start: " + start + " end: " + end;

	return (<div className="Column FileContents" style={fileContentsCss} id={tagname}>
                                <div className="Row" >
                                        <div className="FileLabel" style={fileLabelCss} onClick={returnFunc([[setState, [false, setIsraw]]])} >File</div>
                                        <div className="RawLabel" style={rawLabelCss} onClick={returnFunc([[setState, [true, setIsraw]]])} >Raw</div>
                                        <div className="FileNameBox" style={fileNameBoxCss}>{fileDetails}</div>
                                </div>
				
				<Filter filterClassName="ContentFilter" filterCss={contentfilterCss} filterValue={contentfilter}
				key={"contentfilterof"+N+"N"+tagname}
				onFilterChange={returnEfunc(setContentfilter)} 
				onFilterKeyUp={onEscKeyUp([[resetValue, [setContentfilter]]])} />
				
				<div className="FileBox" style={fileBoxCss} ref={scrollContent}>
                                        {contentJsx}
                                </div>
				{effectDependsJsx}
		</div>
	);
}

export default ReadOnlyFileContent;
