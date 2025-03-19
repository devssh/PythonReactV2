import React from "react";
import "./Page.css";
import {useDispatch, useSelector} from "react-redux";

import {header_nav} from "./components/CssUtilFunctions";
import {useSetOnLoad} from "./components/ReduxUtilFunctions";
import CSVViewer from "./components/CSVViewer";

import {getResults} from "./reducers/databaseService/databaseSlice";


const Database = () => {
	const database = useSelector(state => state.database);
	const dispatch = useDispatch();
	useSetOnLoad(dispatch, [ [getResults, [ 
		[{"idname": "SELECT", "queryname": "TABLENAMES"},
			{"idname": "SELECT", "queryname": "TABLESINFO"},
			{"idname": "SELECT", "queryname": "COLUMNSINFO"},
			{"idname": "SELECT", "queryname": "TABLENAMES"},
			{"idname": "SELECT", "queryname": "DESCRIPTION", "tablename": "test"},
			{"idname": "SELECT", "queryname": "VALUES", "tablename": "test"}
		]] 
	] 
	]);
	return (
		<div className="Body">
			{header_nav([])}
		  <div className="Page">

		     Table names <hr/>
		     <CSVViewer dataTable={database.cache.tablenames} separator="TABS" columns={2}/>

		     Columns info <hr/>
		     <CSVViewer dataTable={database.cache.columnsinfo} separator="TABS" columns={2}/>

		     Tables info <hr/>
		     <CSVViewer dataTable={database.cache.tablesinfo} separator="TABS" columns={2}/>

		     Description of test <hr/>
		     <CSVViewer dataTable={database.cache.test?.description} separator="TABS" columns={2}/>

		     Values of test <hr/>
		     <CSVViewer dataTable={database.cache.test?.values} separator="TABS" columns={2}/>
		     
		     <div className="Row">
			<pre>{JSON.stringify(database, null, 4)}</pre>
		     </div>
		  </div>
		</div>
	);
};

export default Database;
