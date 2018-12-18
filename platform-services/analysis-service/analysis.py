import os
from utils.rasterize import get_site_rasterized
import matplotlib
import json
from spacemakerlog3 import log
import tornado.web

matplotlib.use("agg")

EXPECTED_RATIO = os.getenv("EXPECTED_RATIO", 0.7)
AREAL_TO_AREA = os.getenv("AREAL_TO_AREA", 1.5)
FLOOR_HEIGHT = os.getenv("FLOOR_HEIGHT", 3.2)
SITE_DIM = os.getenv("SIT_DIM", [100, 100])

def worker(buildings):
    rasters = [get_site_rasterized(buildings)]
    return rasters

class Handler(tornado.web.RequestHandler):
    def post(self):
        try:
            data = json.loads(self.request.body.decode('utf-8'))

            log.debug("start analysing")
            #score = worker(data)
            score = 100
            
            self.write(json.dumps({
                "statusCode": 200,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps(score, separators=(",", ":")),  # max minify
            }))
        except Exception as e:
            log.error("Ups, something went wrong", exception=e)
            self.write(json.dumps({
                "statusCode": 500,
                "headers": {"Content-Type": "application/json"},
                "body": json.dumps({"error": e.message}, separators=(",", ":")),
            }))