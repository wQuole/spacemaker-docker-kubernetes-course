import os
import sys
import json
from spacemakerlog3 import log
import tornado.ioloop
import tornado.web
from analysis import Handler

log.set_format("text")
log.set_level("info")
PORT = int(os.getenv('PORT', "8888"))

def make_app(autoreload):
    return tornado.web.Application([(r"/", Handler),], autoreload=autoreload)

if __name__ == "__main__":
    log.info("Starting server on http://localhost:%s/" % PORT)
    autoreload = True if len(sys.argv) > 1 and sys.argv[1] == "autoreload" else False
    log.info("Autoreload: %s" % autoreload)
    app = make_app(autoreload=autoreload)
    app.listen(PORT)
    tornado.ioloop.IOLoop.current().start()