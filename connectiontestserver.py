def sumcheck(data):
    num1 = data["num1"]
    num2 = data["num2"]
    return {"sumcheck": num1 + num2}

def execute(data):
    if data["idname"]=="SUMCHECK":
        return sumcheck(data)
    return {"message": "Unable to recognize idname" + data["idname"]}
