#define Vcc 5.0

class timer { //unsigned long interval
  public:
    timer(unsigned long interval) : _last(millis() ), _interval(interval) {}

    bool isLegal() {
      unsigned long now = millis();
      if (now - _last > _interval){
        _last = now;
        return true;
      }

      return false;
    }

  private :
    unsigned long _last;
    const unsigned long _interval;
     
};

class RDetect { //int pin, float r, unsigned ave = 5, unsigned t = 100
  public:
    RDetect(int pin, float r, unsigned ave = 5, unsigned t = 100) : _pin(pin), _refR(r), _ave(ave), _timer(t), _idx(0) {
      pinMode(pin, INPUT);
      _buffer = new float[ave];
      for(unsigned i = 0; i < ave; ++i)_buffer[i] = -1.0;  
    }
    ~RDetect(){ delete [] _buffer; }

    void loop() {
      unsigned long now = millis();
      if(_timer.isLegal() ){
        _buffer[_idx] = getR();
        
        _idx = (_idx+1) % _ave;
      }
    }

    float getAveR(){
      float ans = 0.0;
      for(int i = 0; i < _ave; ++i)ans += _buffer[i];

      return ans / _ave;
    }

  protected :
    float* _buffer;
    const unsigned _ave;
    
  private:
    timer _timer;
    const int _pin;
    const float _refR;
    unsigned _idx;

    float getV() { return analogRead(_pin)* Vcc /1023.0; }
    float getR() { 
      float v = getV();
      if(v == 5.0 ) return -1;
      return _refR / (Vcc - v) * v;
    }
};

class FSR : public RDetect {  //int pin, float r, unsigned ave = 5, unsigned t = 100
  public :
    FSR(int pin, float r, unsigned ave = 5, unsigned t = 100) :RDetect(pin, r, ave = 5, t = 100) {}

    float getAveF() {
      float ans = 0.0;
      for(int i = 0; i < _ave; ++i) ans += getF(_buffer[i] );
      return ans / _ave;
    }

  private :
    float getF(float r) { 
      if(r == -1.0)return 0.0;
      return r < 30000 ? exp(log(r)*-1.292 + 11.481) : exp(log(r)*-0.592 + 4.503); 
      }
};

FSR fsr1(A0, 1000);
FSR fsr2(A1, 1000);
RDetect bsr = RDetect(A2, 33000);
timer serialPrint(500);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200);
  Serial.println("setup finished");
}

void loop() {
  // put your main code here, to run repeatedly:
  fsr1.loop();
  fsr2.loop();
  bsr.loop();

  if(serialPrint.isLegal() ){
    Serial.print(fsr1.getAveF() );
    Serial.print(",");
    Serial.print(fsr2.getAveF() );
    Serial.print(",");
    Serial.println(bsr.getAveR() );
  }

  if(Serial1.read() == 'g') {
    Serial.println("==========Network Access==========");
    //String ans = "{\"FSR1\":" + to_string(fsr1.getAveF() ) + ",\"FSR2\":" + to_string(fsr2.getAveF() ) + ",\"BSR\":" + to_string(bsr.getAveR() ) + "}";
    //Serial1.println(ans);
    Serial1.println(fsr1.getAveF() );
    Serial1.println(fsr2.getAveF() );
    Serial1.println(bsr.getAveR() );
  }
}
