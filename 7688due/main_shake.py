from flask import Flask
import flask
import random
app = Flask(__name__)

idx = 0
add = True

@app.route('/')
def index():
    global idx
    global add

    result =  "{\"FSR1\":" + str(random.uniform(15 + idx, 16 + idx) ) + ",\"FSR2\":" + str(random.uniform(34 - idx, 35 - idx) ) + ",\"BSR\":" + str(random.uniform(50000, 60000) ) + "}"
    print result
    resp = flask.Response(result);
    resp.headers['Access-Control-Allow-Origin'] = '*'

    if add :
    	idx += 2
    	if idx >= 19 : add = False
    else :
    	idx -= 2
    	if idx <= 0 : add = True

    return resp

if __name__ == '__main__':
    app.run()