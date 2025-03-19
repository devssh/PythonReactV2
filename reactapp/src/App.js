import React from "react";
import "./Page.css";

const header = () => {
	window.location="/";
}

const Sample = () => {

	return (
		<div className="Body">
		  <div className="Header" onClick={header}>
			Immoguna  
		  </div>
		  <div className="Page">
		     <div className="Row">
                        <a href="/color">RGB Color picker</a> 
			+1
		     </div>
		     <div className="Row">
                        <a href="/today">Today stats</a>
			+5
		     </div>
		     <div className="Row">
                        <a href="/metrics">Metrics</a>
			+2
		     </div>
		     <div className="Row">
                        <a href="/systemmetrics">System Metrics</a>
                        +1
                     </div>
		     <div className="Row">
                        <a href="/pixel">Pixel</a>
			+1
		     </div>
		     <div className="Row">
                        <a href="/randompixel">RandomPixel</a>
			+1
		     </div>
		     <div className="Row">
                        <a href="/graph">Graph</a>
			+2
		     </div>
		     <div className="Row">
                        <a href="/connectiontest">Redux dispatch and Connection test with backend</a>
			+2
		     </div>
		     <div className="Row">
                        <a href="/filereader">File reader</a>
			+4
		     </div>
		     <div className="Row">
                        <a href="/filelogger">File logger</a>
		     </div>
		     <div className="Row">
                        <a href="/appservice">App Service</a>
			+3
                     </div>
		     <div className="Row">
                        <a href="/reduxstate">Redux State</a>
			+2
                     </div>
		     <div className="Row">
                        <a href="/notifications">Notifications</a>
			+2
                     </div>
		     <div className="Row">
                        <a href="/database">Database management</a>
			+2
                     </div>
		     <div className="Row">
                        <a href="/watcher">LoC Watcher and View History, File Stats</a>
                     </div>
		     <div className="Row">
                        <a href="/uptime">Uptime</a>
			+1
                     </div>
		     <div className="Row">
                        <a href="/ideas">Ideas</a>
			+1
                     </div>
		     <div className="Row">
                        <a href="/sample">Sample</a>
                        +1
                     </div>

		Total: 22
		  </div>
		</div>
	);
};

export default Sample;
