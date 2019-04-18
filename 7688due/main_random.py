from flask import Flask
import flask
import random
app = Flask(__name__)

@app.route('/')
def index():
    result =  "{\"FSR1\":" + str(random.uniform(20, 30) ) + ",\"FSR2\":" + str(random.uniform(20, 30) ) + ",\"BSR\":" + str(random.uniform(50000, 60000) ) + "}"
    print result
    resp = flask.Response(result);
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run()