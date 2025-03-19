import React from "react";
import "./MinuteDayGrid.css";

const MinuteBox = ({absoluteMinuteNumber, currentMinuteNumber, minuteNumber, hourNumber}) => {
	const minuteClassName=currentMinuteNumber < absoluteMinuteNumber ? "MinuteBoxRemaining": currentMinuteNumber===absoluteMinuteNumber? "MinuteBoxPresent" : "MinuteBoxPast";
	return (<div className={minuteClassName + " " + (minuteNumber %15 === 0 ? "BottomBorderBox" : "") + " " + (hourNumber%6 === 0? "LeftBorderBox":"")}>
		{"" + hourNumber + ":" + (minuteNumber < 10? "0"+minuteNumber:minuteNumber)}
		</div>
	);
}

const HourColumn = ({currentMinuteNumber, hourNumber}) => {
	return <div className="HourColumn"> {[...Array(60).keys()].map(minuteNumber => {
		const absoluteMinuteNumber = parseInt(hourNumber*60)+minuteNumber;
		return <MinuteBox absoluteMinuteNumber = {absoluteMinuteNumber} currentMinuteNumber={currentMinuteNumber} minuteNumber={minuteNumber} hourNumber={hourNumber} key={"minuteBox" + absoluteMinuteNumber} />;
	})} </div>;
}

const Notch = () => {
	return <div className="NotchMark">-</div>;
}

const LeftMarkers = () => {
	return (<div className="LeftMarkers">
		{[...Array(60).keys()].map(x => <Notch key={"leftnotch"+x}/> )}
		</div>
	);
}

const RightMarkers = () => {
        return (<div className="RightMarkers">
                {[...Array(60).keys()].map(x => <Notch key={"rightnotch"+x}/> )}
                </div>
        );
}

const TopHourLegend = () => {
	return (<div className="HourLegend"> 
		{[...Array(24).keys()].map(x => {
                        let hour = "" + (x+13)%12;
                        hour = hour==="0"?"12":hour;
                        const meridian=parseInt((x+13)/12) % 2===1?"am":"pm"
                        const labelText = hour + " " + meridian;
                        return (<div className={"HourMarker" + " " + (x%6 === 0? "LeftBorderBox":"")} key={"topHourLegend"+x}>{labelText}</div>);
        	})}  
		</div>
	);
}

const BottomHourLegend = () => {
	return (<div className="HourLegend"> 
		{[...Array(24).keys()].map(x => {
                	let hour = "" + (x+12)%12;
                	hour = hour==="0"?"12":hour;
                	const meridian=parseInt((x+12)/12) % 2===1?"am":"pm";
                	const labelText = hour + " " + meridian;
                	return (<div className="HourMarker" key={"bottomHourLegend"+x}>{labelText}</div>);
        	})}  
		</div>
	);
}

const MinuteDayGrid = ({secondsElapsedInDay}) => {
	const currentMinuteNumber = parseInt(secondsElapsedInDay / 60);
        const dayGrid = (<div className="DayGrid">
		<div className="Column">
		<TopHourLegend />
		<div className="Row">
			<LeftMarkers />
			{[...Array(24).keys()].map(x => <HourColumn currentMinuteNumber={currentMinuteNumber} hourNumber={x} key={"hourColumn"+x} />)} 
			<RightMarkers />
		</div>
		<BottomHourLegend />
		</div>
		</div>
	);

	return (
		<div className="Row">
		{dayGrid}
		</div>
	);
}

export default MinuteDayGrid;
