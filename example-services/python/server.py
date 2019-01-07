import sys
import json
import tornado.ioloop
import tornado.web

PORT = 8888


class Handler(tornado.web.RequestHandler):
    def get(self):
        print("Request received")
        self.write(
            json.dumps(
                [
                    {"x": 0, "y": 0, "dx": 20, "dy": 20, "dz": 20},
                    {"x": 40, "y": 40, "dx": 20, "dy": 20, "dz": 40},
                ]
            )
        )


def make_app(autoreload):
    return tornado.web.Application([(r"/", Handler)], autoreload=autoreload)


if __name__ == "__main__":
    print("Starting server on http://localhost:%s/" % PORT)
    autoreload = True if len(sys.argv) > 1 and sys.argv[1] == "autoreload" else False
    print("Autoreload: %s" % autoreload)
    app = make_app(autoreload=autoreload)
    app.listen(PORT)
    tornado.ioloop.IOLoop.current().start()
