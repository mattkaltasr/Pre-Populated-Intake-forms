import logging
from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return jsonify({"message": "Hello World!"})

# start the app
if '__main__' == __name__:
    logging.basicConfig(level=logging.DEBUG)
    app.run(debug=True, port=8000)
