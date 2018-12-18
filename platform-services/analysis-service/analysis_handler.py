# to be able to use zip:true in serverless-config
try:
    import unzip_requirements
except ImportError:
    pass

import matplotlib

matplotlib.use("agg")

import json
from spacemakerlog3 import log
from analysis_worker import worker
import base64


def cluster_handler(event, context):
    """
    Handler method for the lambda
    :param event: contains building data
    :param context:
    :return: Score of the proposed solution
    """

    try:
        if not event:
            raise ValueError("no buildings present")

        log.debug("start analysing")

        if "isBase64Encoded" in event and event["isBase64Encoded"]:
            request_body = json.loads(base64.b64decode(event["body"]))
        else:
            request_body = json.loads(event["body"])

        #score = worker(request_body)
        score = 100
        
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps(score, separators=(",", ":")),  # max minify
        }
    except Exception as e:
        log.error("Ups, something went wrong", exception=e)
        return {
            "statusCode": 500,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"error": e.message}, separators=(",", ":")),
        }


def create_json_response(statusCode, body):
    payload = body if valid_json(body) else json.dumps(body)
    return {
        "statusCode": statusCode,
        "headers": {"Content-Type": "application/json"},
        "body": payload,
    }

def valid_json(str):
    try:
        json.loads(str)
    except Exception:
        return False
    return True

def get_value(dic, *keys):
    value = dic
    for key in keys:
        try:
            value = value.get(key)
        except KeyError:
            return None
    return value
