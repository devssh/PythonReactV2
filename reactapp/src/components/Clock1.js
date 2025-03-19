import React from "react";

function shallowCopyWithUpdate(obj, update) {
        let newObj = {};
        Object.keys(obj).map(key => newObj[key]=obj[key]);
        Object.keys(update).map(key => newObj[key]=update[key]);
        return newObj;
}

const Clock1 = ({secondsElapsedInDay, currentMinute, hoursElapsed, time, absolutePositionTop}) => {
	const watchDialColor = "orange";
	const watchCenterColor = "white";
	const dialMarkerColor = "green";
	const dialHourHandColor = "blue";
	const dialMinuteHandColor = "red";
	const dialSecondHandColor = "black";
	const clock1Css = {
   		width: "100%",
   		marginBottom: "1vw",
   		minHeight: "100vw",
   		height: "100vw",
   		alignItems: "center",
   		border: "solid 1px"
	}
	const dial1Radius = 25;
	const dial1RightPosition = 30;
	const dial1Css = {
   		position: "absolute",
   		top: "" + absolutePositionTop + "vw",
   		right: ""+dial1RightPosition+"vw",
   		height: ""+dial1Radius+"vw",
   		minHeight: ""+dial1Radius*2+"vw",
   		maxHeight: ""+dial1Radius*2+"vw",
   		width: ""+dial1Radius*2+"vw",
   		minWidth: ""+dial1Radius*2+"vw",
   		maxWidth: ""+dial1Radius*2+"vw",
   		borderRadius: "50%",
   		backgroundColor: watchDialColor
	}
	const center1Radius = 1;
	const centerPositionTop = absolutePositionTop + dial1Radius;
	const centerPositionRight = dial1RightPosition + dial1Radius;
	const center1Css =  {
		position: "absolute",
   		top: "" + (centerPositionTop - (center1Radius/2)) + "vw",
   		right: "" + (centerPositionRight - (center1Radius/2)) + "vw",
   		height: "1vw",
   		width: "" + center1Radius + "vw",
   		borderRadius: "50%",
   		backgroundColor: watchCenterColor,
   		zIndex: 2
	}

	const timeDisplay1Css = {
   		position: "absolute",
   		top: ""+(absolutePositionTop + dial1Radius*2 + 10)+"vw",
   		right: ""+(dial1RightPosition+ dial1Radius - 6)+"vw",
   		textAlign: "center",
   		height: "3vw",
   		width: "12vw",
   		minWidth: "12vw"
	}
	const dialMarkerWidth=1;
	const dialMarkerHeight=2;
	const dialMarkerCss = {
                width: ""+dialMarkerWidth+"vw",
                height: ""+dialMarkerHeight+"vw",
                backgroundColor: dialMarkerColor,
                position: "absolute",
                top: ""+(centerPositionTop - dialMarkerHeight/2)+"vw",
                right: ""+(centerPositionRight - dialMarkerWidth/2)+"vw",
                zIndex: 1
        }
	const dialLabelHeight = 3;
	const dialLabelWidth = 3;
        const dialLabelCss = {
                position: "absolute",
                top: ""+(centerPositionTop - dialLabelHeight/2)+"vw",
                right: ""+(centerPositionRight - dialLabelWidth/2)+"vw",
                height: ""+dialLabelHeight+"vw",
                width: ""+dialLabelWidth+"vw",
                paddingTop: "0.5vw",
                fontSize: "2vw",
                textAlign: "center",
                zIndex: -1
        }
	const secondHandHeight = 22;
	const secondHandWidth = 0.5;
        const secondHandCss = {
                position: "absolute",
                top: ""+(centerPositionTop-secondHandHeight)+"vw",
                right: ""+(centerPositionRight-secondHandWidth/2)+"vw",
                height: ""+secondHandHeight+"vw",
                width: ""+secondHandWidth+"vw",
                backgroundColor: dialSecondHandColor,
                zIndex: 1
        }
	const minuteHandHeight = 23;
	const minuteHandWidth = 1;
        const minuteHandCss = {
                position: "absolute",
                top: ""+(centerPositionTop - minuteHandHeight)+"vw",
                right: ""+(centerPositionRight - minuteHandWidth/2)+"vw",
                height: ""+minuteHandHeight+"vw",
                width: ""+minuteHandWidth+"vw",
                backgroundColor: dialMinuteHandColor,
                zIndex: 1
        }
	const hourHandHeight=15;
	const hourHandWidth=1.5;
        const hourHandCss = {
                position: "absolute",
                top: ""+(centerPositionTop - hourHandHeight)+"vw",
                right: ""+(centerPositionRight - hourHandWidth/2)+"vw",
                height: ""+hourHandHeight+"vw",
                width: ""+hourHandWidth+"vw",
                backgroundColor: dialHourHandColor,
                zIndex: 1
        }
        const hourHandDeg = (hoursElapsed * 30) + (((secondsElapsedInDay%3600)/3600)*30);
	return (<div className="Clock1" style={clock1Css}>
                        <div className="TimeDisplay1" style={timeDisplay1Css}>{time}</div>
                        <div className="Dial1" style={dial1Css}></div>
                        <div className="Center1" style={center1Css}></div>
                        {[...Array(12).keys()].map(x => <div className={"ClockMarker"+(x%12===0?12:x)} key={"clockMarker"+x}
                                style={shallowCopyWithUpdate(dialMarkerCss, {transform: "rotate("+(x*30)+"deg) translateY(-24vw)"})}>
                                </div>
                        )}
                        {[...Array(12).keys()].map(x => <div className={"DialLabel"+(x%12===0?12:x)} key={"dialLabel"+x}
                                style={shallowCopyWithUpdate(dialLabelCss, {transform: "rotate("+(x*30)+"deg) translateY(-26.5vw) rotate("+(-x*30)+"deg)"})}>
                                {x%12===0?12:x}</div>
                        )}
                        <div className="HourHand" style={shallowCopyWithUpdate(hourHandCss, {transform: "rotate("+ hourHandDeg  +"deg)", transformOrigin: "bottom center"})}></div>
                        <div className="MinuteHand" style={shallowCopyWithUpdate(minuteHandCss, {transform: "rotate("+((((secondsElapsedInDay%60)/60) + currentMinute)*6)+"deg)", transformOrigin: "bottom center"})}></div>
                        <div className="SecondHand" style={shallowCopyWithUpdate(secondHandCss, {transform: "rotate("+((secondsElapsedInDay%60)*6)+"deg)", transformOrigin: "bottom center"})}></div>
        	</div>
	);
}

export default Clock1;
