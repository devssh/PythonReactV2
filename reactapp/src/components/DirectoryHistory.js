import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {vw, border, width, height, dark} from "./CssUtilFunctions";


const DirectoryHistory = () => {
	const directoryHistoryCss = {...width(90), ...height(48), marginTop: vw(5), overflow: "scroll"};
	const filepathHistory = useSelector(state => state.local.filepathHistory);
	const filenameHistory = useSelector(state => state.local.filenameHistory);
	return (<div className="Row History" id="history">
			<div className="DirectoryHistory" style={directoryHistoryCss}>
				<div style={{marginTop: vw(2)}}>
				<div>Directory History</div>
				{filepathHistory.map(x => {return (<div style={{"border": border()}}>{Object.values(x)}</div>)})}
				</div>
				<div style={{marginTop: vw(2)}}>
				<div>File History</div>
				{filenameHistory.map(x => {return (<div style={{"border": border()}}>{Object.values(x)}</div>)})}
				</div>
			</div>
		</div>
	);
}

export default DirectoryHistory;
