import React from "react";


const Filter = ({filterClassName="filter", filterCss={}, filterValue="", placeholder="Filter", onFilterChange, onFilterKeyUp, filterType="input"}) => {
	const placeholderValue="Filter";
	const filterJsx = filterType==="input" ? (
		<input style={filterCss} value={filterValue} placeholder={placeholderValue} type="text"
		onChange={onFilterChange} onKeyUp={onFilterKeyUp} ></input>
	) : (
		<textarea style={filterCss} value={filterValue} placeholder={placeholderValue}
		onChange={onFilterChange} onKeyUp={onFilterKeyUp} ></textarea>
	);
	return (
		<div className={filterClassName}>
			{filterJsx}
		</div>
	);
}

export default Filter;
