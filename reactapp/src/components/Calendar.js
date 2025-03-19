import React from "react";
import "./Calendar.css";

function atLeastZero(x) {
        return x < 0 ? 0 : x;
}

function datePostfix(number) {
	if (number%10===1 && number!== 11) {
		return "" + number + "st";
	}
	if (number % 10 === 2 && number !== 12) {
		return "" + number + "nd";
	}
	if (number % 10 === 3 && number !== 13) {
		return "" + number + "rd";
	}
	return "" + number + "th";
}

function calendarWeekAllocation(monthNumber, year, today) {
        const aWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const isLeapYear = year%4 === 0? true : false;
        const daysInAMonth = {0: 31, 1: isLeapYear?29:28, 2: 31, 3: 30, 4:31, 5: 30, 6: 31, 7: 31, 8: 30, 9: 31, 10: 30, 11: 31};
        const startDayOfTheYear = ((atLeastZero(year-1) * 365) + parseInt(atLeastZero((year-1)/4)))%7;
        const daysInCurrentMonth = daysInAMonth[monthNumber];
        const daysPassedTillCurrentMonth = (() => {let daysPassed=0; for(let i=0; i<monthNumber; i++) {daysPassed+= daysInAMonth[i];} return daysPassed;})();
        const startDayOfCurrentMonth = (startDayOfTheYear + daysPassedTillCurrentMonth) % 7;
        const numberOfWeeksInCurrentMonth = Math.ceil((daysInCurrentMonth + startDayOfCurrentMonth)/7);
        const maxWeeksInAMonth = 6;
        let dayMapping = [
                ...[...Array(maxWeeksInAMonth).keys()].map(y =>  [...[...Array(7).keys()].map(x => x+(1+(7*y)-startDayOfCurrentMonth))])
        ];
        return (<div className="Weekly">
                {[...Array(numberOfWeeksInCurrentMonth).keys()].map(function(weekNumber) {
                        return (<div className="Week" key={"week"+weekNumber+"m"+monthNumber+"y"+year}>
                                {aWeek.map(function(day) {
                                        const dayNumber = dayMapping[weekNumber][aWeek.indexOf(day)];
                                        const disabledDay = dayNumber <= 0 || dayNumber > daysInCurrentMonth;
					const absoluteDayNumber = dayNumber + daysPassedTillCurrentMonth;
                                        const pastDay = absoluteDayNumber < today;
                                        const presentDay = today === absoluteDayNumber;
					const absoluteWeekNumber = 1 + parseInt(absoluteDayNumber / 7);

                                        return (<div className={(disabledDay?"Disabled":pastDay?"Past":presentDay?"Today":"Future")+"CalendarDay"} key={"calendarDay"+day +"w"+ weekNumber +"m"+monthNumber+"y" + year+"a"+absoluteDayNumber}>
                                        <div>{!disabledDay ? datePostfix(dayNumber) : ""}</div>
                                        <div>{!disabledDay ? "Day " + absoluteDayNumber :  ""}</div>
                                        <div>{!disabledDay ? "Week " + absoluteWeekNumber :  ""}</div>
                                        </div>
                                        );
                                })}
                                </div>
                        );
                })}
                </div>
        );
}

const monthChart = (monthNumber, year, today) => {
        const isLeapYear = year%4 === 0? true : false;
        const months = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July",
                7: "August", 8: "September", 9: "October", 10: "November", 11:"December"};
        const aWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (<div className="CalendarMonth">
                <div className="MonthLabel"> {months[monthNumber]}  </div>
                <div className="DayOfWeekLabel">
                {aWeek.map(x=> <div className="WeekDayLabel" key={"weekdaylabel"+x}>{x}</div>)}
                </div>
                {calendarWeekAllocation(monthNumber, year, today)}
                </div>
        );
}

const Calendar = ({year, day}) => {

	return (<div className="Calendar">
                        <div className="Monthly">
                        {[...Array(12).keys()].map(x=> <div className="Month" key={"month"+x} > {monthChart(x, year, day)} </div>)}
                        </div>
                     </div>
	);
}

export default Calendar;
