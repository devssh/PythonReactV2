import React from "react";
import "./Page.css";

import {header_nav} from "./components/CssUtilFunctions";

const Sample = () => {

	return (
		<div className="Body">
			{header_nav([])}
		  <div className="Page">
		     <div className="Row">
                        Sample
		     </div>
		  </div>
		</div>
	);
};

export default Sample;
