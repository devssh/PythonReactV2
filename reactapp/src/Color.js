import React from "react";
import "./Page.css";
import "./Color.css";


const HexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
const InverseHexArray = {"0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, 
	"9": 9, "A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15
};

const PaletteBox = ({r, g, b, x, y, z}) => {
	const tx = InverseHexArray[r]+1;
	const ty = InverseHexArray[g]+1;
	const tz = InverseHexArray[b]+1;
	const cssStyle={backgroundColor:`#${r}${g}${b}` , color:(tx*tx + ty*ty + tz*tz) < 259 ? "#FFF": "#000"}
	return (
	<div className="Column PaletteBox" style={cssStyle} key={`PaletteBox${r}${g}${b}${x}${y}${z}`}>
        	{`#${r}${g}${b}`}
        </div>
	);
}

const HexColorPalette = ({r=-1, g=-1, b=-1, i=-1}) => {
	if (!(r < 0)) {
		return (
			<div className="RGBPalette">
				<div className="RGBLegend">{`R ${r}`}</div>
				<div className="RGBPaletteBox">
					{HexArray.map(function(G, y) {
							return (<div className="Row" key={`RGBPaletteBoxR${G}${r}${g}${b}${i}${y}`}>
								{HexArray.map(function(B, z) {
									return (<PaletteBox r={r} g={G} b={B} x={i} y={y} z={z} key={`HexPaletter${r}G${G}B${B}${i}${y}${z}`} />);
									})
								}
						</div>);
						})
					}
				</div>
			</div>
		);
	}
	if (!(g < 0)) {
		return (
                        <div className="RGBPalette">
                                <div className="RGBLegend">{`G ${g}`}</div>
                                <div className="RGBPaletteBox">
                                        {HexArray.map(function(R, x) {
                                                        return (<div className="Row" key={`RGBPaletteBoxG${R}${r}${g}${b}${x}${i}`}>
                                                                {HexArray.map(function(B, z) {
                                                                        return (<PaletteBox r={R} g={g} b={B} x={x} y={i} z={z} key={`HexPaletteR${R}g${g}B${B}${x}${i}${z}`} />);
                                                                        })
                                                                }
                                                </div>);
                                                })
                                        }
                                </div>
                        </div>
                );
	}
	return (
                        <div className="RGBPalette">
                                <div className="RGBLegend">{`B ${b}`}</div>
                                <div className="RGBPaletteBox">
                                        {HexArray.map(function(R, x) {
                                                        return (<div className="Row" key={`RGBPaletteBoxB${R}${r}${g}${b}${x}${i}`}>
                                                                {HexArray.map(function(G, y) {
                                                                        return (<PaletteBox r={R} g={G} b={b} x={x} y={y} z={i} key={`HexPaletteR${R}G${G}b${b}${x}${y}${i}`} />);
                                                                        })
                                                                }
                                                </div>);
                                                })
                                        }
                                </div>
                        </div>
                );
}

const CssColorMaker = () => {
	return (
	<div className="Column">
		{HexArray.map((r, x) => <HexColorPalette r={r} i={x} key={"HexColorPaletteR"+r}/>)}
		{HexArray.map((g, y) => <HexColorPalette g={g} i={y} key={"HexColorPaletteG"+g}/>)}
		{HexArray.map((b, z) => <HexColorPalette b={b} i={z} key={"HexColorPaletteB"+b}/>)}
	</div>
	);
}

const Color = () => {

	return (
		<div className="Body">
		  <div className="Header">
			Color Picker 
		  </div>
		  <div className="Page">
		     <CssColorMaker />
		  </div>
		</div>
	);
};

export default Color;
