import React from "react";

const header = () => {
        window.location="/";
}

const vw = (value) => {
        return "" + value.toString() + "vw";
}

const px = (value) => {
        return "" + value.toString() + "px";
}

const border = () => {
        return px(1) + " solid white";
}

const borderColor = (selectedColor) => {
	return px(1) + " solid " + selectedColor;
}

const width = (value, percent=false) => {
        const widthValue = percent ? value.toString()+"%" : vw(value);
        return {width: widthValue, minWidth: widthValue, maxWidth: widthValue};
}

const height = (value) => {
        const heightValue = vw(value);
        return {height: heightValue, minHeight: heightValue, maxHeight: heightValue};
}

const minHeight = (value) => {
	const heightValue = vw(value);
	return {height: heightValue, minHeight: heightValue};
}

const dark = () => {
	return {color: "white", backgroundColor: "black"};
}

const padding = (size=1) => {
	return {padding: vw(size)};
}

function capitalize(someword) {
	if (someword.length > 2) {
		const [first, second, ...last] = someword;
		return [second.toUpperCase(), ...last].join("");
	}
	return someword
}

const header_nav = (front_links, rear_links=[]) => {
        const linkCss = {fontSize: vw(1), fontFamily: "monospace", color: "white", marginLeft: vw(1)};
        const homeLinkCss = {color: "white", textDecoration: "none", fontFamily: "monospace", fontSize: vw(3), 
	position: "fixed", left: vw(43), top: vw(0)
	};
	const rearlinkpad = 95 - rear_links.join("").length;
	const rearLinkCss = {color: "white", textDecoration: "none", fontFamily: "monospace", fontSize: vw(3),
        position: "fixed", left: vw(rearlinkpad), top: vw(-0.5)
        };
        const frontLinksJsx = front_links.map(link => (<a href={link} className="FrontLink" style={linkCss} 
		key={"frontlink" + link}>
		{capitalize(link)}
		</a>
	));
        const rearLinksJsx = rear_links.map(link => (<a href={link} className="RearLink" style={linkCss}
		key={"rearlink" + link}
		>{capitalize(link)}</a>));
        return (<div className="HeaderNav Row">
			<div className="FrontLinkDiv" style={{marginLeft: vw(2), marginTop: vw(-0.5)}}>
                        {frontLinksJsx}
			</div>
			<div>
                        <a href="/" style={homeLinkCss}>Immoguna</a>
			</div>
			<div className="RearLinkDiv" style={rearLinkCss}>
			{rearLinksJsx}
			</div>
                  </div>
        );
}

export {header, vw, px, border, width, height, minHeight, borderColor, dark, padding, header_nav};
