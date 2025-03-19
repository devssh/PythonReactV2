import subprocess
import json
import re

idname="idname"
home="/Users/devssh/EventServer/"

def useSubprocess(command, commandInput=""):
    myprocess = subprocess.Popen(command, text=True, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, errors = myprocess.communicate(input=commandInput)
    myprocess.wait()
    return [output, errors]

def wchello(data):
    count = useSubprocess(["cat "+ home +"Event/Aggregate/hello.json"])
    count = "".join(count)
    count = dict(json.loads(count))
    count = count["Hello"]
    result = useSubprocess(["wc -l " + home + "Event/uptime.txt"])
    output = result[0].strip().split(" ")
    sumoutput = str(int(output[0]) + count)
    output = "" + sumoutput + " " + output[1]
    error = result[1]
    return {"wchello": "" + output}

def uptimedays(data):
    result = useSubprocess(["cat "+ home +"Event/Aggregate/uptime.json"])
    output = dict(json.loads("".join(result[0])))
    error = result[1]
    return {"uptimedays": output}

def dushEventServer(data):
    result = useSubprocess(["du -sh " + home ])
    output = result[0]
    error = result[1]
    return {"eventserversize": "" + output}

def pathBinaries(data):
    result = useSubprocess(["echo $PATH"])
    output = result[0]
    error = result[1]
    return {"path": "" + output}

def netstat(data):
    result = useSubprocess(["/usr/sbin/netstat"])
    output = result[0]
    error = result[1]
    return {"netstat": "" + output}

def ifconfig(data):
    result = useSubprocess(["/sbin/ifconfig"])
    output = result[0]
    error = result[1]
    return {"ifconfig": "" + output}

def psaux(data):
    result = useSubprocess(["ps aux"])
    output = result[0]
    error = result[1]
    return {"psaux": "" + output}

def uname(data):
    result = useSubprocess(["uname -a"])
    output = result[0]
    error = result[1]
    return {"uname": "" + output}

def whoami(data):
    result = useSubprocess(["whoami"])
    output = result[0]
    error = result[1]
    return {"whoami": "" + output}

def df(data):
    result = useSubprocess(["df -h"])
    fix1 = re.sub("map auto_home", "map_auto_home", result[0])
    output = re.sub("Mounted on", "Mounted_on", fix1)
    error = result[1]
    return {"df": "" + output}

def uptime(data):
    result = useSubprocess(["uptime"])
    output = result[0]
    error = result[1]
    return {"uptime": "" + output}

#top, whereis, whatis, cal, dig, nslookup, wall, lsof, mkpasswd

def execute(data):
    if data[idname] == "WCHELLO":
        return wchello(data)
    if data[idname] == "UPTIMEDAYS":
        return uptimedays(data)
    if data[idname] == "DISKUSAGE":
        return dushEventServer(data)
    if data[idname] == "PATH":
        return pathBinaries(data)
    if data[idname] == "NETSTAT":
        return netstat(data)
    if data[idname] == "IFCONFIG":
        return ifconfig(data)
    if data[idname] == "PSAUX":
        return psaux(data)
    if data[idname] == "UNAME":
        return uname(data)
    if data[idname] == "WHOAMI":
        return whoami(data)
    if data[idname] == "DISKFREE":
        return df(data)
    if data[idname] == "UPTIME":
        return uptime(data)
    return {"message": "Unable to recognize idname" + data[idname]}

