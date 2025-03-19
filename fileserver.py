import os
import logging
import json

home="/Users/devssh/EventServer/Codebase/PythonReact/"
shortFileLineLimit=1000

idname="idname"
filepath="filepath"
filename="filename"
directory="directory"

def useReadFile(name, start, end):
    with open(name, mode="r") as file:
        data = file.readlines()
        datalen = len(data)
        datasubset = {index: line for index, line in enumerate(data) if (index >= start) and (index < end)}
        return {"data": datasubset, "total": datalen, "start": start, "end": end}

def useListdir(path=home):
    return list(sorted(os.listdir(path)))

def useDirectory(path):
    items = useListdir(path)
    output = [[file, os.path.isdir(path + file)] for file in items]
    directory = list(sorted([[item, status] for [item, status] in output if status]))
    files = list(sorted([[item, status] for [item, status] in output if not status]))
    return {path: [*directory, *files]}


def useWriteFile(name, data, mode="w"):
    with open(name, mode=mode) as file:
        file.writelines(data)

def readHomeDirectory():
    return {"directory": useDirectory(home), "home": home}

def readFile(data):
    if not data[filename].startswith(home):
        return {"message": "Access to file denied"}
    start = 0
    end = shortFileLineLimit
    if "start" in data.keys():
        start = data["start"]
    if "end" in data.keys():
        end = data["end"]
    return {data[filename]: useReadFile(data[filename], start, end)}

def readDirectory(data):
    if not data[filepath].startswith(home):
        return {"message": "Access to filepath denied"}
    return {directory: useDirectory(data[filepath])}

def writeFile(data, mode="w"):
    path = "" + data[filepath]
    name = "" + data[filename]
    useWriteFile(path + name, "contentDraft", mode)
    contentData = useReadFile(path + name)
    return {"content": contentData}

def writeNewFile(request):
    return writeFile(request, "x")

def appendToFile(request):
    return writeFile(request, "a")

def execute(data):
    requestname = data["idname"]
    if requestname=="READHOMEDIRECTORY":
        return readHomeDirectory()
    if requestname=="READFILE":
        return readFile(data)
    if requestname=="READDIRECTORY":
        return readDirectory(data)
    return {"message": "Unable to recognize idname" + data["idname"]}

