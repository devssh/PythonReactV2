import React from "react";
import { useState, useEffect } from "react";
import "./Page.css";
import moment from "moment";
import {header} from "./components/CssUtilFunctions";

import PercentProgressBar from "./components/PercentProgressBar";
import DayProgressBar from "./components/DayProgressBar";
import MinuteDayGrid from "./components/MinuteDayGrid";
import Clock1 from "./components/Clock1";
import Clock2 from "./components/Clock2";
import Calendar from "./components/Calendar";

function useTime() {
	const [time, setTime] = useState(() => moment().format('h:mm:ss a'));
	useEffect(() => {
                const id = setInterval(()=> { setTime(moment().format('h:mm:ss a')) }, 1000);
                return () => clearInterval(id);

        }, []);
	return time;
}

function useDate() {
        const [date, setDate] = useState(() => moment().format('MMMM Do YYYY'));
        useEffect(() => {
                const id = setInterval(()=> { setDate(moment().format('MMMM Do YYYY')) }, 1000);
                return () => clearInterval(id);

        }, []);
        return date;
}

function useDay() {
        const [day, setDay] = useState(() => moment().dayOfYear());
        useEffect(() => {
                const id = setInterval(()=> { setDay(moment().dayOfYear()) }, 1000);
                return () => clearInterval(id);

        }, []);
        return day;
}

function convertToSeconds(time) {
	const arr = time.split(":");
	const hour = arr[0], minute = arr[1], second = arr[2].split(" ")[0], meridiemIndicator = arr[2].split(" ")[1];
	return parseInt((hour%12)*3600) + parseInt(minute * 60) + parseInt(second) + (meridiemIndicator==="pm" ? 12*3600 : 0);
}


const Today = () => {
	const time = useTime();
	const date = useDate();
	const day = useDay();
	const totalSecondsInDay = 86400;
	const secondsElapsedInDay = convertToSeconds(time);
	const secondsLeft = totalSecondsInDay - secondsElapsedInDay;
	const percentageCompletion = (secondsElapsedInDay*100/totalSecondsInDay).toFixed(2);
	const currentMinute =parseInt( secondsElapsedInDay/60);
	const totalMinutesInDay = 1440;
	const remainingMinutes = totalMinutesInDay - currentMinute;
	const hoursLeft = parseInt(secondsLeft / 3600);
	const timeToDayEnd = ""+hoursLeft + " hours " + parseInt((secondsLeft%3600)/60) + " minutes and " + (secondsLeft%60) + " seconds"
	const year = parseInt(moment().format("YYYY"));
	const isLeapYear = year%4 === 0? true : false;
	const daysInYear = 355 + (isLeapYear? 1:0);
	const hoursElapsed = parseInt(secondsElapsedInDay/3600)
	const hourProgressSlice = (secondsElapsedInDay%3600)/3600;

	return (
		<div className="Body">
		  <div className="Header" onClick={header}>
			{ date } 
		  </div>
		  <div className="Page">
		     <div className="Row">

		     	<div className="Column1">
		     	<div> It is { time } </div>
		     	<div> { secondsElapsedInDay } out of { totalSecondsInDay } seconds elapsed </div>
		     	<div> {secondsLeft} seconds remaining today </div>
		     	<div> { percentageCompletion }% day completion </div>
		     	</div>

			<div className="MinuteColumn">
				<div> Day {day} of {daysInYear}  </div>
				<div> {currentMinute} out of {totalMinutesInDay} minutes completed  </div>
				<div> {remainingMinutes} minutes left today </div>
				<div> Day {day} ends in {timeToDayEnd}</div>
			</div>

		     </div>
                     <PercentProgressBar percentageCompletion={percentageCompletion} />

		     <DayProgressBar time={time} secondsElapsedInDay={secondsElapsedInDay} />
			
		     <MinuteDayGrid secondsElapsedInDay={secondsElapsedInDay} />
			
		     <Clock1 secondsElapsedInDay={secondsElapsedInDay} currentMinute={currentMinute} hoursElapsed={hoursElapsed} time={time} absolutePositionTop={170}/>
		     
		     <Clock2 secondsElapsedInDay={secondsElapsedInDay} currentMinute={currentMinute} hoursElapsed={hoursElapsed} time={time} absolutePositionTop={270}/>

		     <Calendar year={year} day={day} />
		  </div>
		</div>
	);
};

export default Today;
