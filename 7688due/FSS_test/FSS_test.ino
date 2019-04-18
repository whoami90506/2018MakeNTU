#define pin1  A0
#define pin2  A1
#define pin3  A2
#define Rohm 1000.0
#define R1ohm 33000.0
#define Vcc 5.0

#include<math.h>

int val1 = 0;
int val2 = 0;
int val3 = 0;

class FSR{
  FSR(){
    
  }
};

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial1.begin(115200);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  val1 = analogRead(pin1);
  val2 = analogRead(pin2);
  val3 = analogRead(pin3);
  Serial.print(getForce(val1, Rohm) );
  Serial.print(",");
  Serial.print(getForce(val2, Rohm) );
  Serial.print(",");
  Serial.println(getForce(val3, R1ohm) );
  Serial1.println(getForce(val3, R1ohm));
  //Serial.println(val3*5.0/1024.0 );
  delay(100);
}

double getForce(int val, float r) {
  if(val == 1023) return 0;
  float  ohm = float(r*val) / (1023.0-int(val) );
  return ohm;
  return ohm < 30000 ? pow(exp(1), log(ohm)*-1.292 + 11.481) : pow(exp(1), log(ohm)*-0.592 + 4.503);
}

