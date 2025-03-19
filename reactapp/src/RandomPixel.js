import React, {useState, useEffect} from "react";
import "./Pixel.css";

const px = (number=1) => {return `${number}px`;};

function useSeed() {
        const [seed, setSeed] = useState(() => Math.random());
        useEffect(() => {
		const milliseconds = 333;
                const id = setInterval(()=> { setSeed(Math.random()) }, milliseconds);
                return () => clearInterval(id);

        }, []);
        return seed;
}

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

function getRndInteger(max) {
  const min = 0;
  /*min included max excluded*/
  return Math.floor(Math.random() * (max - min) ) + min;
}

function randomBGColor(seed) {
	const rColorNumber=toHex(getRndInteger(256));
        const gColorNumber=toHex(getRndInteger(256));
        const bColorNumber=toHex(getRndInteger(256));
	return `#${rColorNumber}${gColorNumber}${bColorNumber}`;
}

const PixelRow = ({width, height, pixelCss, seed}) => {
	return (
		<div className="Row">
		{[...Array(width).keys()].map(function(x) {
			return (<div className="Column Pixel" style={shallowCopyWithUpdate(pixelCss, 
				{backgroundColor: randomBGColor(seed)})} key={"PixelRow"+width+"h"+height+"h"+x}>
			</div>
			);
		})}
		</div>
	);
};

const Grid = ({width, height, pixelCss, seed}) => {
	return (
		<div className="PixelBox">
		{[...Array(height).keys()].map(x=> <PixelRow width={width} height={x} pixelCss={pixelCss} seed={seed} key={"pixelBox"+width +"h"+ height +"h"+x}/>)}
		</div>
	);
};

const RandomPixel = () => {
	const width=1700; /*1700 340 columns with 1px left bottom margin*/
	const height=960; /*960 960/5=192 160 rows visible with 1px left bottom margin*/
	const factor = 5; /* factor of 5 = 65280 cells */
	const pixelCss = {
 		height: px(factor),
 		width: px(factor),
		backgroundColor: "red"
	};
	const seed = useSeed();
	/*{marginLeft: px(), marginBottom: px(),}*/
	return (
		<div className="PixelBody">
		<Grid width={width/factor} height={height/factor} pixelCss={pixelCss} seed={seed}/>
		</div>
	);
};

export default RandomPixel;
