import json
from random import randint
from flask import Flask
app = Flask(__name__)


@app.route('/')
def get_buildings():
    app.logger.info("Request received")
    return json.dumps(
        [
            {"x": 0, "y": 30,
             "dx": 33, "dy": 33, "dz": 3},

            {"x": 31, "y": 61,
             "dx": 3, "dy": 33, "dz": 3},

            {"x": 62, "y": 92,
             "dx": 33, "dy": 33, "dz": 3}
        ]
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
