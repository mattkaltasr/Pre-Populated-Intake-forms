from flask import Flask, request
from flask_cors import CORS

import time

app = Flask(__name__)
CORS(app)


@app.route("/test", methods=["POST"])
def test_post():

    params = request.json.get("params")

    return {"response": params}

