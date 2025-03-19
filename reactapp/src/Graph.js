import React, {useState, useEffect} from "react";

const px = (number=1) => {return `${number}px`;};

function shallowCopyWithUpdate(obj, update) {
        let newObj = {};
        Object.keys(obj).map(key => newObj[key]=obj[key]);
        Object.keys(update).map(key => newObj[key]=update[key]);
        return newObj;
}

function toHex(number) {
	if(number < 16) {
		return "0" + number.toString(16);
	}
	return number.toString(16);
}

function equation1(x) {
	/*y = mx + c; y=x;*/
	return 1*x + 0;
}

function equation2(x) {
	return round(x*x + 0*x + 0);
}

function round(x, decimalPrecision=2) {
	return Number(x).toFixed(decimalPrecision);
}

function factorStyle(pixelCss, x, y, context) {
	return {...pixelCss, top: px(y*5), left: px(x*5+0.5)};
}

function detectorShader(eqValue, xValue, yValueLower, yValueUpper, color) {
	if ( eqValue >= yValueLower && eqValue < yValueUpper) {
                return {borderRadius: "50%", zIndex: 2, backgroundColor: color};
        }
}

function equationDetectionStyle(pixelCss, i, j, context) {
	const height = context.height;
	const width = context.width;
	const factor = context.factor;
	const origin = context.origin;
	const scale = context.scale;
	const grid = context.grid;
	const x=scale["x"]*(i*factor - origin["y"])/factor;
	const y=scale["y"]*-(j*factor - origin["x"])/factor;

	const topLeftCoordinates = {"x": x, "y": y};
	const xValue = x + 0.5*scale["x"];
	const yValueUpper = y;
	const yValueLower = y-1*scale["y"];
	/*
	if (x===0.1 && y===0.1) {
		return {...pixelCss, borderRadius: "50%", zIndex: 2, backgroundColor: "red"};
	}
	*/
	let style = {...pixelCss};
	const eq1 = equation1(xValue);
	style = {...style, ...detectorShader(eq1, xValue, yValueLower, yValueUpper, "red")};
	const eq2 = equation2(xValue);
	style = {...style, ...detectorShader(eq2, xValue, yValueLower, yValueUpper, "green")};
	return style;
}

const Grid = ({context}) => {
	const height = context.height;
	const width = context.width;
	const factor = context.factor;
	const origin = context.origin;
	const grid = context.grid;
	const pixelCss = {
                position: "absolute",
                minHeight: px(factor),
                minWidth: px(factor),
                backgroundColor: "black",
		zIndex: 1
        };
	const originDetector = equation1(0) === 0 || equation2(0)===0;
	let originStyle = {...pixelCss, top: px(origin["x"]-factor/2+0.5), left: px(origin["y"]-factor/2+0.5), zIndex: 2};
	if (originDetector) {
		originStyle["backgroundColor"] = "white";
		originStyle["borderRadius"]="50%";
	}
	const gridJsx = [...Array(grid["y"]).keys()].map(function(y) {
                        return [...Array(grid["x"]).keys()].map(function(x) {
                                return (<div className="FactorBox" style={factorStyle(pixelCss, x, y, context)}>
					<div className="Detector" style={equationDetectionStyle(pixelCss, x, y, context)}></div>
					</div>);
                                });

                        }).flat();
	return (
		<div className="GraphBox">
		<div className="Origin" style={originStyle}></div>
		{gridJsx}
		</div>
	);
};

const coordinatePosition = (coordinate, origin, scale, factor) => {
	return {position: "absolute", top: origin["x"] - coordinate["y"]*factor/scale["y"], left: origin["y"] + coordinate["x"]*factor/scale["x"], "coordinate": coordinate};
};

function labelCss(position) {
	const boxSide = px(25);
	const offsetXAxis = {x: -12.5, y: 5};
	const offsetYAxis = {x: -35, y: -5};
	const coordinate = position.coordinate;
	const fontSize = px(10);
	let offset = offsetXAxis;
	if (coordinate["x"] ===0 && coordinate["y"]===0) {
		return {"display": "none"};
	}

	if (coordinate["x"]===0) {
		offset = offsetYAxis;
	}
	
	return {"position": "absolute", top: px(position["top"] + offset["y"]), left: px(position["left"] + offset["x"]), width: boxSide, height: boxSide, zIndex: 5, fontSize: fontSize};
}

function markerCss(position) {
	const size = 2;
	return {borderRadius: "50%", height: px(size), width: px(size), backgroundColor: "white", zIndex: 5,
		"position": "absolute", top: px(position["top"]-(size/2)+0.5), left: px(position["left"]-(size/2)+0.5)
	};
}

function monospacedLabel(number) {
	if (parseInt(number)===number) {
		if (number >= 10) {
			return "+" + number.toString();
		}
		if (number > 0 && number < 10) {
			return "+0" + number.toString();
		}
		if (number > -10 && number < 0) {
			return "-0" + Number(-number).toString();
		}
		return number.toString();
	}
	if (number > 0) {
		return "+" + round(number, 1).toString();
	}
	return round(number, 1).toString();
}

const DrawAxis = ({context}) => {
	const height=context.height;
	const width=context.width;
	const factor=context.factor;
	const origin = context.origin;
	const scale = context.scale;
	const marker = context.marker;
	const axisColor = "white";
	const xAxisCss = {position: "absolute", width: width, height: px(), backgroundColor: axisColor, 
		zIndex: 3, top: px(origin["x"])
	};
	const yAxisCss = {position: "absolute", width: px(), height: height, backgroundColor: axisColor,
                zIndex: 4, left: px(origin["y"])
	};
	const numXLabels = parseInt(width*scale["x"]/(marker["x"]*2*factor));
	const numYLabels = parseInt(height*scale["y"]/(marker["y"]*2*factor));
	let xLabelCoord = [...Array(numXLabels).keys()].map(x => {return {"x": x*marker["x"], "y": 0}});
	let yLabelCoord = [...Array(numYLabels).keys()].map(y => {return {"x": 0, "y": y*marker["y"]}});
	xLabelCoord = [...xLabelCoord, ...[...Array(numXLabels).keys()].map(x => {return {"x": -x*marker["x"], "y": 0}})];
	yLabelCoord = [...yLabelCoord, ...[...Array(numYLabels).keys()].map(y => {return {"x": 0, "y": -y*marker["y"]}})];
	const xLabelPos = xLabelCoord.map(coordinate => coordinatePosition(coordinate, origin, scale, factor));
	const yLabelPos = yLabelCoord.map(coordinate => coordinatePosition(coordinate, origin, scale, factor));
	const xLabelJsx = xLabelPos.map(pos => <div className="XAxisLabel" style={labelCss(pos)}>{monospacedLabel(pos["coordinate"]["x"])}</div>);
	const yLabelJsx = yLabelPos.map(pos => <div className="YAxisLabel" style={labelCss(pos)}>{monospacedLabel(pos["coordinate"]["y"])}</div>);
	return (<div style={{position: "absolute", top: px(0), left: px(0)}}>
			<div className="XAxis" style={xAxisCss}></div>
			<div className="YAxis" style={yAxisCss}></div>
			<div className="XAxisLabels" style={{position: "absolute", top: px(0), left: px(0)}}>
				{xLabelJsx}
				{xLabelPos.map(pos => <div className="XAxisMarkers" style={markerCss(pos)}> </div>)}
			</div>
			<div className="YAxisLabels" style={{position: "absolute", top: px(0), left: px(0)}}>
				{yLabelJsx}
				{yLabelPos.map(pos => <div className="YAxisMarkers" style={markerCss(pos)}> </div>)}
			</div>
		</div>
	);
};

const Graph = () => {
	const width=1800; /*1800 => 360 columns*/
	const height=1000; /*1000 1000/5 = 200 rows*/
	const factor = 5; /* factor of 5 = 72k cells of 5px x 5px */
	const grid = {x: parseInt(width/factor), y: parseInt(height/factor)};
	const scaleX = 0.1;
	const scaleY = 0.1;
	const scale={x: scaleX, y: scaleY};
	const originX=height/2;
	const originY=width/2;
	const origin = {x: originX, y: originY};
	const markerX = 1;
	const markerY = 1;
	const marker = {x: markerX, y: markerY};
	document.body.style.overflow = "hidden";
	const context = {width: width, height: height, factor:factor, grid, origin: origin, scale: scale, marker: marker
	};
	return (
		<div className="GraphBody" style={{position: "absolute", top: px(0), left: px(0)}}>
		<DrawAxis context={context} />
		<Grid context={context} />
		</div>
	);
};

export default Graph;
