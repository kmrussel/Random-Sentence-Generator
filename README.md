# Random-Sentence-Generator
Program fetches a random language wikipedia article and sends a random sentence from the overivew. 
Type 'npm install' into the console to install all the required node modules and then type 'npm start' to run the program. 
This service uses RabbitMQ as a communication pipe. 

How to Request Data 
Once it is running, the service will readily listen for any requests. Set your queue to 'get_sentence' and message to 'get_sentence' in your send file. The service will consume any any messages in the 'get_sentence' queue. If the message is also set to 'get_sentence', it will automatically send back a random sentence.  

How to Receive Data
To receive data from the generator, set the queue in your receive file to 'rand_sentence'. After requesting data, the service will send back a random sentence as a JSON response to this queue for your program to consume. 

![UML di![UML diagram microservice](https://user-images.githubusercontent.com/80930289/180602415-6f4fc78e-1fd9-4154-9e15-4e099980d07d.png)

