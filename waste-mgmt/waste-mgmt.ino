#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
int ECHO   = D2;
int TRIGGER = D3;
// Replace with your network credentials
const char* ssid = "Deepback";
const char* password = "passworddeep";
ESP8266WebServer server(80);   //instantiate server at port 80 (http port)
String page = "";
int data;
void setup(void) {
  pinMode(TRIGGER, OUTPUT);
  pinMode(ECHO, INPUT);
  Serial.begin(9600);
  WiFi.begin(ssid, password); //begin WiFi connection
  Serial.println("");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  server.on("/", []() {
    page = "{\"distance\":" + String(data) + "}";
    Serial.println("Handling Request");
    server.sendHeader("Access-Control-Allow-Origin", "*");
    server.send(200, "application/json", page);
  });
  server.begin();
  Serial.println("Web server started!");
}
void loop(void) {
  digitalWrite(TRIGGER, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIGGER, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER, LOW);
  long duration = pulseIn(ECHO, HIGH);
  int temp = (duration / 2) / 29.09;
  if (temp > 0)
  {
    data = temp;
    Serial.println(data);
  }
  server.handleClient();
}
