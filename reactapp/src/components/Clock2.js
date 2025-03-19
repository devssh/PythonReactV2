import React from "react";

function shallowCopyWithUpdate(obj, update) {
        let newObj = {};
        Object.keys(obj).map(key => newObj[key]=obj[key]);
        Object.keys(update).map(key => newObj[key]=update[key]);
        return newObj;
}

function vw(number) {
	return "" + number + "vw";
}

const TriangularClockHand1 = ({name, height, width, color, centerTop, centerRight, rotateDeg, zIndex}) => {
	const clockHandCss = {position: "absolute",
                top: vw(centerTop-height),
                right: vw(centerRight-width),
                borderLeft:vw(width)+" solid transparent",
                borderRight:vw(width)+" solid transparent",
                borderBottom:vw(height)+" solid "+ color,
                zIndex: zIndex,
		transform: "rotate("+rotateDeg+"deg)",
                transformOrigin: "bottom center"
        };	
	const bezelColor = "lightgrey";
	const reverseHandCssUpdate = {transform: "rotate("+(180 + rotateDeg)+"deg) scaleY(0.33)"};
	const clockHandCssUpdateBezel = {transform: "rotate("+rotateDeg+"deg) scaleY(0.4)", 
		borderBottom:vw(height)+" solid "+ bezelColor, zIndex: 2
	};
	const reverseHandCssUpdateBezel = {transform: "rotate("+(180 + rotateDeg)+"deg) scaleY("+(0.4*0.33)+")", 
		borderBottom:vw(height)+" solid "+ bezelColor, zIndex: 2
	};
	
	return (<div>
		<div className={name} style={clockHandCss}></div>
		<div className={"Reverse" + name} style={shallowCopyWithUpdate(clockHandCss, reverseHandCssUpdate)}></div>
		<div className={name+"Bezel"} style={shallowCopyWithUpdate(clockHandCss, clockHandCssUpdateBezel)}></div>
		<div className={"Reverse" + name + "Bezel"} style={shallowCopyWithUpdate(clockHandCss, reverseHandCssUpdateBezel)}></div>
		</div>
	);
}

const Clock2 = ({secondsElapsedInDay, currentMinute, hoursElapsed, time, absolutePositionTop}) => {
	const watchDialColor = "#1E293B";
	const watchCenterColor = "#1E293B";
	const dialMarkerColor = "lightgrey";
	const dialHourHandColor = "#CC8913";
	const dialMinuteHandColor = "#CC8913";
	const dialSecondHandColor = "#CC8913";
	const clock1Css = {
   		width: "100%",
   		marginBottom: "1vw",
   		minHeight: "90vw",
   		height: "90vw",
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
	const center1Radius = 0.25;
	const centerPositionTop = absolutePositionTop + dial1Radius;
	const centerPositionRight = dial1RightPosition + dial1Radius;
	const center1Css =  {
		position: "absolute",
   		top: vw(centerPositionTop - (center1Radius/2)),
   		right: vw(centerPositionRight - (center1Radius/2)),
   		height: vw(center1Radius),
   		width: vw(center1Radius),
   		borderRadius: "50%",
   		backgroundColor: watchCenterColor,
   		zIndex: 3
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
	const secondHandHeight = 24;
	const secondHandWidth = 0.5;
	const minuteHandHeight = 23;
	const minuteHandWidth = 1;
	const hourHandHeight=17;
	const hourHandWidth=1.5;
	const secondHandDeg = (secondsElapsedInDay%60)*6;
	const minuteHandDeg = (((secondsElapsedInDay%60)/60) + currentMinute)*6
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
                        
		        <TriangularClockHand1 name={"HourHand"} height={hourHandHeight} width={hourHandWidth} color={dialHourHandColor} centerTop={centerPositionTop} centerRight={centerPositionRight} rotateDeg={hourHandDeg} zIndex={1} />        
		        <TriangularClockHand1 name={"MinuteHand"} height={minuteHandHeight} width={minuteHandWidth} color={dialMinuteHandColor} centerTop={centerPositionTop} centerRight={centerPositionRight} rotateDeg={minuteHandDeg} zIndex={1} />        
		        <TriangularClockHand1 name={"SecondHand"} height={secondHandHeight} width={secondHandWidth} color={dialSecondHandColor} centerTop={centerPositionTop} centerRight={centerPositionRight} rotateDeg={secondHandDeg} zIndex={1} />        
        	</div>
	);
}

export default Clock2;
