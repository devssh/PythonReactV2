import React from "react";
import "./Page.css";

import {header_nav} from "./components/CssUtilFunctions";

const Sample = () => {
	const message = `
		Activity Log +1
                Syntax coloring 
                Connect to database +1
                Event Queue +1
                Bootstrapper
                Code analyser
                Metrics: LoC, Time +1
                Git
                File Write
                Language Tokens .py .js .java
                GPT connection +1
                Website AWS
                Docker
                Printout clinic
                Jira board
                Velocity track
		Diff checker
		New file writer
		File Editor
		One time execute file autodelete cronjob +1
		Tic Tac Toe
		Chess Stockfish
		Game of life
		PnC of alphabet to find keywords +1
		SMTP


	`;
	return (
		<div className="Body">
			{header_nav([])}
		  <div className="Page">
		     <div className="Row">
			<pre>{message}</pre>
		     </div>
		  </div>
		</div>
	);
};

export default Sample;
