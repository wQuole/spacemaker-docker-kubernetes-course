import json
from random import randint
from flask import Flask
app = Flask(__name__)


@app.route('/')
def get_buildings():
    app.logger.info("Request received")
    return json.dumps(
        [
            {"x": randint(0, 10), "y": randint(0, 10),
             "dx": 5, "dy": 5, "dz": 5},
            {"x": randint(20, 30), "y": randint(20, 30),
             "dx": 5, "dy": 5, "dz": 5},
        ]
    )


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
