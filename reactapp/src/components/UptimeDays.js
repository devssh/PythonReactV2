import React from "react";

import CSVViewer from "./CSVViewer";

const UptimeDays = ({uptimedays}) => {
	const ready = typeof(uptimedays) === "object";
	const daylist = ready ? [...Object.keys(uptimedays)] : [];
	const daycounts = ready ? daylist.map(day => {
		const daychart = [day, "" + uptimedays[day]["daycount"] + " / 480" ];
		return daychart;
	}) : uptimedays;
	return (<div>
		<CSVViewer dataTable={daycounts} separator="TABS" columns={2}/>
		</div>
	);
};

export default UptimeDays;
