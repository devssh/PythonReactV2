reducer="reducer"
GET="GET"
POST="POST"

import json

from reducertypes import FILES, METRIC, NETWORK, CONNECTIONTEST, SAMPLE, DATABASE
import fileserver
import metricserver
import networkserver
import connectiontestserver
import sampleserver
import dbserver

mapping={
        FILES: fileserver, 
        METRIC: metricserver, 
        NETWORK: networkserver, 
        CONNECTIONTEST: connectiontestserver, 
        SAMPLE: sampleserver,
        DATABASE: dbserver
}

def useRequestVariables(request, args=[], method=POST):
    if method == POST:
        return {**json.loads(request.get_data(cache=False, as_text=True))}
    return {arg:request.args.get(arg, default="home", type=str)  for arg in args}

def execute(request):
    data = useRequestVariables(request)["data"]
    reducername = data[reducer]
    response = mapping[reducername].execute(data)
    if "uuid" in data.keys():
        return {**response, data["uuid"]:"uuid" }
    return response


