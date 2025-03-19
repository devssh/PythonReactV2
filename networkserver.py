import subprocess 

idname="idname"
home="/Users/devssh/EventServer/"
python_dir="Codebase/PythonReact/"
react_dir="Codebase/PythonReact/reactapp/"
#point to original here

def useSubprocess(command, commandInput=""):
    myprocess = subprocess.Popen(command, text=True, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, errors = myprocess.communicate(input=commandInput)
    myprocess.wait()
    return [output, errors]

def restart():
    useSubprocess(["sh " + home + react_dir + "restart.sh"])
    useSubprocess(["sh " + home + python_dir + "restart.sh"])
    return {"message": "Restarted"}

def execute(data):
    if data[idname] == "RESTART":
        return restart()
    return {"message": "Unable to recognize idname" + data[idname]}
