from flask import Flask, request

import connectionserver

app = Flask(__name__)
app.debug=True
path_prefix="/api"


@app.route("/")
def homePage():
    return "Hello World"

@app.route(path_prefix + "/execute", methods=["POST"])
def executeRequest():
    return {"data": connectionserver.execute(request)}

if __name__ == "__main__":
    app.run(port=8001, debug=True)
