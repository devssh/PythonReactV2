idname="idname"

def helloworld(data):
    return {"sample": "HelloWorld"}

def execute(data):
    if data[idname]=="HELLOWORLD":
        return helloworld(data)
    return {"message": "Unable to recognize idname" + data[idname]}

