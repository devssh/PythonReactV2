
function getRequest(url, query) {
	const keys = Object.keys(query);
        if (keys.length === 0) {
        	return fetch(url);
        }
        const queryValue = "?" + keys.map(key => key + "=" + query[key]).join("&");
        return fetch(url + queryValue);
}

function postRequest(url, query) {
	return fetch(url, {"method": "POST",
                "body": JSON.stringify({"data": query})
        });
}

export default function fetchRequest(request) {
	//console.log("fetchNetworkRequestAPI", request);
	const method = request["method"] || "POST";
	const url = request["url"] || "/api/execute";
	const query = request["query"];

	if (method === "GET") {
		return getRequest(url, query);
	}
	return postRequest(url, query);
}

