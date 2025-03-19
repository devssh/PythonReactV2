import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {v4} from "uuid";

function etargetValue(e) {
	return e.target.value
}

function ekeyEquals(e, value) {
	return e.key === value;
}

function ekeySetContains(e, setValues) {
	return setValues.has(e.key);
}

function runCall(method, args) {
	if (args.length === 0) {
		method();
	}
	method(...args);
}

function runCalls(calls) {
	calls.map(call => runCall(call[0], call[1]));
}

export const scrollDivOn = () => {
	const vwToPxRatio = 100;
	return function(divRef, data) {
        	divRef.current.scrollTop = data.length * vwToPxRatio;
	}
}

export const returnFunc = (calls) => {
	return function() {
		runCalls(calls);
	};
}

export const returnEfunc = (setter) => {
	return function(e) {
		setter(etargetValue(e));
	};
}

export const onEnterKeyUp = (calls) => {
	return function(e) {
		if (ekeyEquals(e, "Enter")) {
			runCalls(calls);
		}
	};
}

export const onEscKeyUp = (calls) => {
	return function(e) {
		if (ekeyEquals(e, "Escape")) {
			runCalls(calls);
		}
	};
};

export const EffectDepends = ({methodCall, args, dependency=[]}) => {
	useEffect(()=>{
		runCall(methodCall, args);
	}, dependency);
	return (<div className="EffectDepends"></div>);
	
};

export const EffectTimer = ({methodCall, args, dependency=[]}) => {
	useEffect(()=>{
		const id = setInterval(()=>{
			runCall(methodCall, args)
		}, 1000);
		return () => clearInterval(id);
	}, dependency);
	return (<div className="EffectTimer"></div>);
};

export const redirect = (url) => {
	return function() {
		window.location = url;
	};
};

const checkKey = (obj, selector) => {
	if (typeof(obj) !== "object") {
		return false;
	}
	if (Object.keys(obj).filter(key => key === selector).length > 0) {
		return true;
	}
	return false;
};

const logicalAndReduce = (acc, ele) => {
	return acc && ele;
};

export const checkKeys = (obj, selectors) => {
	return selectors.map(selector => checkKey(obj,selector)).reduce(logicalAndReduce, true);
};

const joinObj = (obj, ele) => {
	return {...obj, ...ele};
};

const createObj = (key, val) => {
	const newObj={};
	newObj[key]=val;
	return newObj;
};

export const makeObj = (kvPairs) => {
	return {...kvPairs.map(kv => createObj(kv[0], kv[1])).reduce(joinObj, {})};
};

export const generateRandom = () => {
	return v4();
}
