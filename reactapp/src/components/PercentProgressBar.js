import React from "react";
import "./PercentProgressBar.css";

function atLeastZero(x) {
	return x < 0 ? 0 : x
}

const PercentProgressBar = ({percentageCompletion}) => {
	const percentageCompletionQuotient = parseInt(percentageCompletion/5);
        const percentageCompletionRemainder = percentageCompletion - percentageCompletionQuotient*5;

	return (<div className="DayProgress">
                        <div className="ProgressTopMarker">
                                {[...Array(atLeastZero(percentageCompletionQuotient-1)).keys()].map(x=> <div className="VerticalLabel" key={"verticalLabelPercentProgress"+x}></div>)}
                                <div className="VerticalLabel" style={{width: "" + (2.4+ ((percentageCompletionRemainder/5)*4) ) + "vw"}}></div>
                                <div className="VerticalLabelText">
                                        {percentageCompletion}%
                                </div>
                        </div>
                        <div className="ProgressBar">
                                <div className="ProgressCompletion">
                                        {[...Array(percentageCompletionQuotient).keys()].map(x => <div className="CompletedProgressBox" key={"completedDayPercentProgress"+x}></div>)}
                                </div>
                                <div className="CompletedProgressBoxSlice1" style={{width:"" + (percentageCompletionRemainder/5) * 4 + "vw"}}></div>
                                <div className="ProgressBoxSlice1" style={{width: "" + ((5-percentageCompletionRemainder)/5)*4 +"vw"}}></div>
                                <div className="ProgressAvailable">
                                        {[...Array(atLeastZero(20 - (percentageCompletionQuotient + 1))).keys()].map(x => <div className="ProgressBox" key={"availableDayPercentProgress" + x}></div>)}
                                </div>
                        </div>
                        <div className="ProgressBottomMarker">
                                <div className="Labels">
                                {[...Array(20).keys()].map(x => <div className="Cuts" key={"dayCompletePercentCutLabels"+x}>{(x+1)*5}%</div> )}
                                </div>
                        </div>
                </div>
	);
}

export default PercentProgressBar;
