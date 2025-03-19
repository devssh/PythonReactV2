import React from "react";

const sliceItems = (items, first, last) => {
	if ((first < items.length) && (last < items.length)) {
		return items.slice(first, last);
	}
	if (first < items.length) {
		return items.slice(first);
	}
	return [];
}

const Grid = ({items, rowCount=0, columnCount=0}) => {
	if (rowCount !== 0) {
		const count = parseInt(items.length/rowCount) + 1;
		const col = [...Array(count).keys()].map(x => <div className="Row" key={"gridcol"+x+"r"+rowCount+"c"+columnCount}>
			{sliceItems(items, rowCount*x, rowCount*(x+1))}
			</div>
		);
		return (<div className="Column">
				{col}
			</div>
		);
	}
	const colCount = parseInt(items.length/columnCount) + 1;
	const row = [...Array(colCount).keys()].map(x => <div className="Column" key={"gridrow"+x+"r"+rowCount+"c"+columnCount}>
			{sliceItems(items, columnCount*x, columnCount*(x+1))}
			</div>
	);
	return (<div className="Row">
			{row}
		</div>
	);
}

export default Grid;
