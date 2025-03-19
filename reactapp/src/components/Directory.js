import React, {useState} from "react";

import HoverItem from "./HoverItem";
import Filter from "./Filter";
import Grid from "./Grid";

import {setOnChange, useSetOnLoad, simpleSetOnChange} from "./ReduxUtilFunctions";
import {width, height, border, vw, dark} from "./CssUtilFunctions";
import {returnFunc, returnEfunc, onEscKeyUp, onEnterKeyUp, checkKeys, makeObj} from "./ReactUtilFunctions";
import { useSelector, useDispatch } from 'react-redux';

import {getFile} from "../reducers/filesService/filesSlice";
import {setLocalCache, addNotification, addFilename, addFilepath} from "../reducers/localService/localSlice";

const reduceFilepath = (filepath, minimumpath) => {
	const minsplits = minimumpath.split("/").length;
        const path = filepath.split("/");
        if (path.length > minsplits) {
                return [...path.slice(0, -2), ""].join("/");
        }
        return filepath;
}

const resetNamefilter = (setter) => {
        const defaultValue="";
        setter(defaultValue);
}

function filterByTextPredicate(value, filterValue) {
        return value.toLowerCase().startsWith(filterValue.toLowerCase());
}

const Directory = ({N=1}) => {
	const directoryBoxCss = {...width(90), ...height(42), border: border(), marginTop: vw(1), fontSize: vw(1), padding: vw(1),
					overflow: "scroll"
	};
        const fileExplorerCss = {...width(90, true), paddingTop: vw(5)};
	const pathInputCss = {...width(90), ...height(2), fontSize: vw(1), ...dark(), padding: vw(0.5), marginTop: vw(0.5)};
	const namefilterCss = {...width(90), ...height(1.5), fontSize: vw(1), ...dark(), padding: vw(0.5), marginTop: vw(0.5)};
	const historyLinkCss = {marginLeft: vw(1), ...width(10), ...height(2), fontSize: vw(2)};

	const dispatch = useDispatch();
	const loading = "Loading...";
	const filesCache = useSelector(state => state.files.cache);
	const directoryReady = checkKeys(filesCache, ["home", "directory"]);
	const placeholderDirectory = makeObj([[loading, [] ]]);
	const homepath = directoryReady ? filesCache.home : loading;
	const directory = directoryReady ? filesCache.directory : placeholderDirectory;
	
	const filepathKey = "filepath"+N;
	const filenameKey = "filename"+N;
	const localCache = useSelector(state => state.local.cache);
	const pathReady = checkKeys(localCache, [filepathKey]);
	const nameReady = checkKeys(localCache, [filenameKey]);
	const placeholderLocal = {filepathKey: loading, filenameKey: loading};
	const filepathN = pathReady ? localCache[filepathKey] : placeholderLocal[filepathKey];
	const filenameN = nameReady ? localCache[filenameKey] : placeholderLocal[filenameKey];
	const filepath = pathReady ? filepathN : homepath;
	
	const [namefilter, setNamefilter] = useState("");
	useSetOnLoad(dispatch, [[getFile, [{"idname": "READHOMEDIRECTORY"}]]]);
	
	const onFileClickFn = (name) => {
		const filename = filepath + name;
		return returnFunc([
                			[setOnChange,
                                              [dispatch, [
						[setLocalCache, [makeObj([[filenameKey, filename], [filepathKey, filepath]])]],
                                              	[getFile, [{"idname": "READFILE", "filename": filename}]],
                                              ]]
                                        ],
                                        [resetNamefilter, [setNamefilter]]
		]);
	};

	const onDirClickFn = (name) => {
		const newfilepath = filepath + name + "/";
		return returnFunc([
                                  	[setOnChange,
                                              [dispatch, [
                                                [setLocalCache, [makeObj([[filepathKey, newfilepath]])]],
                                                [getFile, [{"idname": "READDIRECTORY", "filepath": newfilepath}] ]
                                              ]]
                                        ],
                                        [resetNamefilter, [setNamefilter]]
        	]);
	};
	const filterReady = checkKeys(directory, [filepath]);
	const dirJsx = filterReady ? directory[filepath].filter(data => filterByTextPredicate(data[0], namefilter)).map(function(data) {
                                                const name = data[0];
                                                const isdir = data[1];
                                                return <HoverItem id={name} classid={"DirectoryFile"} isdir={isdir}
                                                onFileClick={onFileClickFn(name)}
                                                onDirClick={onDirClickFn(name)}
                                                key={name} />
                                        }) : "";

	return (<div className="Column FileExplorer" style={fileExplorerCss} id="path">
                                <div>
				<input style={pathInputCss} type="text" value={filepath}
                                onChange={simpleSetOnChange(dispatch, [setLocalCache, filepathKey])}
                                onKeyUp={onEnterKeyUp([
					[setOnChange, 
						[dispatch, [
							[getFile, [{"idname": "READDIRECTORY", "filepath": filepath}] ]
						]]
					]
				])}
                                ></input>
				</div>
				<Filter filterClassName="Directory Filter" filterCss={namefilterCss} filterValue={namefilter} 
				onFilterChange={returnEfunc(setNamefilter)} 
				onFilterKeyUp={onEscKeyUp([[resetNamefilter, [setNamefilter]]])}
				/>
			<div className="DirectoryBox Row" style={directoryBoxCss}>
				<div className="Column">
                                        <HoverItem id={".."} classid={"DirectoryFile"} isdir={true}
                                        onFileClick={()=> {}}
                                        onDirClick={returnFunc([
                                                [setOnChange, 
							[dispatch, [
								[setLocalCache, [makeObj([[filepathKey, reduceFilepath(filepath, homepath)]])] ], 
								[getFile, [{"idname": "READDIRECTORY", 
									"filepath": reduceFilepath(filepath, homepath)}
								]]
							]]
						]
					])}
                                        key={".."} backbutton={true} />

                                        <Grid items={dirJsx} rowCount={5} />
				</div>
			</div>
		</div>
	);
}

export default Directory;
