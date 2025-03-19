import React from "react";
import "./Page.css";
import {header_nav} from "./components/CssUtilFunctions";

import Directory from "./components/Directory";
import DirectoryHistory from "./components/DirectoryHistory";
import FileContent from "./components/FileContent";
import Notifications from "./components/Notifications";

const FileLogger = () => {

	return (
		<div className="Body">
		{header_nav(["#history", "#path", "#document1"], ["#notifications"])}
		  <div className="Page">
			<div className="Column">
				<div className="Column">
					<DirectoryHistory />
					<Directory N={1}/>
					<FileContent tagname={"document1"} N={1}/>
					<Notifications />
				</div>
			</div>
		  </div>
		</div>
	);
};

export default FileLogger;
