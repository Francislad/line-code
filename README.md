# line-code
Project that implements 8B6T line code algorithm



## Backend
For the connection to other computers, it's necessary to change "senderIp" to the ip and port of the other computer's backend. Otherwise, the application will communicate only with itself.

- `cd back`: access the backend folder
- `npm i`: installs the application's packages
- `npm start`: executes the application with remote access capabilities

The application will be served on `0.0.0.0:8080`, where `0.0.0.0` is the machine ip.



## Frontend
- `cd front`: access the frontend folder
- `npm i`: installs the application's packages
- `npm start`: executes the application with remote access capabilities

The application will be served on `0.0.0.0:4200`, where `0.0.0.0` is the machine ip.

It is also possible to run the following command instead of the later:
- `npm run dev`: executes the application with local access only

Then, the application will be served on `localhost:4200`.



## Usage
With the frontend open in the browser, messages can be sent and received. 

Any message sent will be:
- cryptographed
- converted to ascii, then binary and then hexadecimal
- converted to an encoded signal using 8B6T line code algorithm
- sent to the setted receiver
Any message received will be:
- converted to hexadecimal using 8B6T line code algorithm
- converted to binary, then ascii and then to a message composed of alphanumerical characters
- decryptographed

On the front is possible to see:
- a history of sent and received messages
- the alphanumerical message
- the binary
- the hexdecimal
- the encoded signal
- the graph for the encoded signal



## Useful links
**Explanations**: https://docs.google.com/document/d/1X00RJ3-QrzzB2dqg36ii6BqfKGh0fl7s8_lu79mmIUg/edit?usp=sharing
