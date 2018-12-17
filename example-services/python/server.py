import sys
import json
import tornado.ioloop
import tornado.web

PORT = 8888


class HelloHandler(tornado.web.RequestHandler):
    def post(self):
        data = json.loads(self.request.body.decode('utf-8'))
        message = "Hello, %s!" % data['name']
        print(message)
        self.write(json.dumps({
            "greeting": message
        }))


def make_app(autoreload):
    return tornado.web.Application([
        (r"/hello", HelloHandler),
    ], autoreload=autoreload)


if __name__ == "__main__":
    print("Starting server on http://localhost:%s/" % PORT)
    autoreload = True if len(
        sys.argv) > 1 and sys.argv[1] == "autoreload" else False
    print("Autoreload: %s" % autoreload)
    app = make_app(autoreload=autoreload)
    app.listen(PORT)
    tornado.ioloop.IOLoop.current().start()
