import React from "react";
import "./Pixel.css";

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

const PixelRow = ({width, height, pixelCss}) => {
	const colorNumber=toHex(parseInt((height/191)*255));
	return (
		<div className="Row">
		{[...Array(width).keys()].map(x=> <div className="Column Pixel" 
			style={shallowCopyWithUpdate(pixelCss, {backgroundColor: `#0000${colorNumber}`})}
			key={"pixelcolumnof"+x+"x"+width+"w"}></div>)}
		</div>
	);
};

const Grid = ({width, height, pixelCss}) => {
	return (
		<div className="PixelBox">
		{[...Array(height).keys()].map(x=> <PixelRow width={width} height={x} pixelCss={pixelCss} key={"pixelrowof"+width +"w" + x}/>)}
		</div>
	);
};

const Pixel = () => {
	const width=1700; /*1700 340 columns with 1px left bottom margin*/
	const height=960; /*960 960/5=192 160 rows visible with 1px left bottom margin*/
	const factor = 5; /* 65280 cells */
	const pixelCss = {
 		height: px(factor),
 		width: px(factor),
		backgroundColor: "red"
	};
	/*{marginLeft: px(), marginBottom: px(),}*/
	return (
		<div className="PixelBody">
		<Grid width={width/factor} height={height/factor} pixelCss={pixelCss} key={"gridof"+height+"h"+width+"w"+factor+"f"}/>
		</div>
	);
};

export default Pixel;
