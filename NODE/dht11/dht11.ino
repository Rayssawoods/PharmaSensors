//Programa : Sensor de umidade e temperatura DHT11
//Autor : Arduino e Cia

#include <dht.h>

#define dht_dpin A2 //Pino DATA do Sensor ligado na porta digital 2

dht DHT; //Inicializa o sensor

void setup()
{
  Serial.begin(9600);
  delay(1000);//Aguarda 1 seg antes de acessar as informações do sensor
}

void loop()
{
  DHT.read11(dht_dpin); //Lê as informações do sensor
  //Serial.print("Umidade = ");
  Serial.print(DHT.temperature);
  Serial.print(",");
  Serial.println(DHT.humidity);

  //Serial.print("Temperatura = ");
  
 // Serial.println(" Celsius  ");

  //Não diminuir o valor abaixo. O ideal é a leitura a cada 2 segundos
  delay(5000);  
}
