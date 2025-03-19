import React from "react";
import "./DayProgressBar.css";

const DayProgressHourBottomLegend = () => {
        return (<div className="DayProgressHourLegend">
                <div className="DayProgressHourLegend1">
                {[...Array(97).keys()].map(x => <div className={"DayProgressHourMarkerLabel" + ((x%4) +1)} key={"dayProgressHourMarkerLabel"+x} >
                        {"|"}
                        </div>
                )}
                </div>
                <div className="DayProgressHourLegend2">
                {[...Array(25).keys()].map(x => {
                        let hour = "" + (x+12)%12;
                        hour = hour==="0"?"12":hour;
                        const meridian=parseInt((x+12)/12) % 2===1?"am":"pm";
                        const labelText = hour + " " + meridian;
                        return (<div className="DayProgressHourLabel" key={"dayProgressHoursLabel"+x}>{labelText}</div>);
                })}
                </div>
                </div>
        );
}

const DayProgressHourTopLegend = ({time, secondsElapsedInDay}) => {
        const hoursElapsed = parseInt(secondsElapsedInDay/3600)
        const hourProgressSlice = (secondsElapsedInDay%3600)/3600;
        return (<div className="DayProgressHourTopLegend">
                                <div className="DayProgressVerticalBoxLine">
                                        {[...Array(hoursElapsed).keys()].map(x=> <div className="VerticalLabelDayProgress" key={"verticalLabelDayProgressBox" +x}></div>
                                        )}
                                        <div className="VerticalLabelCompletedBoxSlice1" style={{minWidth: "" + (5*hourProgressSlice) + "vw"}}> </div>
                                        <div className="VerticalLabelDayProgressText">{time}</div>
                                </div>
                </div>
        );
}

const DayProgressBar = ({time, secondsElapsedInDay}) => {
	const hoursElapsed = parseInt(secondsElapsedInDay/3600)
        const hourProgressSlice = (secondsElapsedInDay%3600)/3600;
	const hoursLeft = parseInt((86400 - secondsElapsedInDay)  / 3600);
	return (<div className="DayProgressBar">
                        <DayProgressHourTopLegend time={time} secondsElapsedInDay={secondsElapsedInDay}/>
                        <div className="ProgressBar">
                           <div className="DayProgressCompletedBoxLine">
                                {[...Array(hoursElapsed).keys()].map(x=> <div className="DayProgressCompletedBox" key={"completedDayProgressBox" +x}></div>)}
                           </div>
                           <div className="DayProgressCompletedBoxSlice1" style={{minWidth: "" + (5*hourProgressSlice) + "vw"}}> </div>
                           <div className="DayProgressAvailableBoxSlice1" style={{minWidth: "" + (5*(1-hourProgressSlice) + "vw")}}> </div>
                           <div className="DayProgressAvailableBoxLine">
                                {[...Array(hoursLeft).keys()].map(x=> <div className="DayProgressAvailableBox" key={"dayProgressAvailableBox" +x}></div>)}
                           </div>
                        </div>
                        <DayProgressHourBottomLegend />
                </div>
	);
}

export default DayProgressBar;
