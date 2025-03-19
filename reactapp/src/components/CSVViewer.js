import React from "react";
import {vw, border, padding, width, height} from "./CssUtilFunctions";
import {generateRandom} from "./ReactUtilFunctions";

const separatorindex = {"TABS": " ", ",": ","};

const maxInt = (acc, ele) => Math.max(acc, ele);
const minInt = (acc, ele) => Math.min(acc, ele);

const frequencyCount = (acc, ele) => {
	if (typeof(acc[ele])==="number") {
		acc[ele] = acc[ele] + 1;
		return acc;
	}
	return acc[ele] = 1;
};

const TableGrid2D = (data2D=[[]], cellStyleOutline={}) => {
	const maxShape = {"x": data2D.map(row => row.length).reduce(maxInt, 0), "y": data2D.length};
	const minShape = {"x": data2D.map(row => row.length).reduce(minInt, maxShape["x"]), "y": data2D.length};
	if (maxShape["x"] != minShape["x"] || maxShape["y"] != minShape["y"]) {
		console.log("data 2D shape error", maxShape, minShape);
	}
	const maxInternalShape = {"x": data2D.map(row => row.map(cell => cell.length).reduce(maxInt, 0)), 
		"y": [...Array(maxShape["x"]).keys()].map(x => data2D.map(row => row[x].length).reduce(maxInt, 0))
	};
	const minInternalShape = {"x": data2D.map(row => row.map(cell => cell.length).reduce(minInt, 0)), 
		"y": [...Array(maxShape["x"]).keys()].map(x => data2D.map(row => row[x].length).reduce(minInt, maxInternalShape["y"][x]))
	};
	const cells = data2D.map(row => {
		const rowJSX = row.map((cell, index) => {
			let cellContent = cell;
			const columnWidth = typeof(maxInternalShape["y"][index]) === "number" ? maxInternalShape["y"][index] : cell.length + 2;
			let cellStyle = {...cellStyleOutline, ...width(columnWidth), ...height(2)};
			const bigCell = columnWidth > 88;
			const bigCellStyle = {...cellStyle, ...width(88), ...height(3.5), padding: 0,  overflowY: "scroll"};
			if (bigCell) {
				const newHeight = parseInt(cell.length/88)+1;
				cellStyle = {...cellStyle, ...width(85), ...height(newHeight), 
					wordWrap: "break-word", wordBreak: "break-all"};
				cellContent = (<div style={cellStyle}>
					{newHeight.toString() + " " + cell}
				</div>);
			}
			return (<div style={bigCell ? bigCellStyle : cellStyle} key={generateRandom()}>
                                	{cellContent}
                                </div>
			);
		});
		return (<div className="Row" key={generateRandom()}>
                        	{rowJSX}
                        </div>
		);
	});
	return (<div className="Column" key={generateRandom()}>
                	{cells}
                </div>
	);

};

const CSVViewer = ({dataTable, separator=",", newlines="\n", columns=11}) => {
	const cellStyle={border: border(), ...padding(), 
		fontFamily: "monospace", fontSize: vw(1)
	};
	
	const data = typeof(dataTable) === "string" ? dataTable : "";
	const dataArray = typeof(dataTable) === "object" ? dataTable : "";
	const rows = data.split(newlines);
	const data2Draw = rows.map(row => row.split(separatorindex[separator]).filter(cell => cell.length > 0)).filter(row => row.length > 0);
	const data2D = dataArray.length > 0 ? dataArray : data2Draw.map(row => {
		const newRow = [];
		[...Array(columns).keys()].map(index => {
			const last = columns - 1 ;
			newRow[index] = row[index];
			if (index === last) {
				newRow[index] = row.filter((cell, index) => index >=last).join(" ");
			}
		});
		return newRow;
	});
	const ready = data2D.length > 0;
	const cells = ready ? TableGrid2D(data2D, cellStyle): "";
	return (<div className="2DTableGridCSV" style={{overflow: "scroll", ...width(90), ...height(50), 
			marginTop: vw(2), marginBottom: vw(2)}
	}>
			{cells}
		</div>
	);
};

export default CSVViewer;
