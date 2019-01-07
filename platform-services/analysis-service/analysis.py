import matplotlib
import json
from spacemakerlog3 import log
import tornado.web
from worker import calculate_score


matplotlib.use("agg")


class Handler(tornado.web.RequestHandler):
    def post(self):
        try:
            data = json.loads(self.request.body.decode("utf-8"))

            log.debug("start analysing")
            score = calculate_score(data)

            self.write(
                json.dumps(
                    {
                        "statusCode": 200,
                        "headers": {"Content-Type": "application/json"},
                        "body": json.dumps(score, separators=(",", ":")),  # max minify
                    }
                )
            )
        except Exception as e:
            log.error("Ups, something went wrong", exception=e)
            self.write(
                json.dumps(
                    {
                        "statusCode": 500,
                        "headers": {"Content-Type": "application/json"},
                        "body": json.dumps({"error": e.message}, separators=(",", ":")),
                    }
                )
            )
