import serial
from flask import Flask
import flask
app = Flask(__name__)

s = serial.Serial('/dev/ttyS0', 115200)


@app.route('/')
def index():
    global s
    s.write('g');
    fsr1 = s.readline()
    fsr2 = s.readline()
    bsr  = s.readline()
    result =  "{\"FSR1\":" + fsr1 + ",\"FSR2\":" + fsr2 + ",\"BSR\":" + bsr + "}"
    print result
    resp = flask.Response(result);
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run()