## Chatty Doc
DocTalk is a doctor-patient communication web-app designed to streamline healthcare interactions. 
The platform facilitates seamless communication between healthcare providers and patients, offering a range of features to enhance the 
medical experience for both parties.

## Features
* **Real-time Messaging:** Send and receive messages instantly without refreshing the page.
* **User Authentication:** Secure authentication system ensures privacy and security.
* **User Friendly Interface:** Clean and intuitive UI design for easy navigation and interaction.

## Tech Stack
* **ReactJS:** React is a JavaScript library for building user interfaces
* **SocketIO:** Socket.IO is a JavaScript library for real-time web applications. It enables bidirectional communication
                between web clients and servers, facilitating real-time data exchange.
* **Flask:** Flask is a lightweight web framework for Python used to build web applications and RESTful APIs.
* **Mongo DB:** MongoDB is a NoSQL database program designed for ease of development and scaling. It stores data in flexible, JSON-like documents
  
## Installation
To run Chatty Doc locally, follow these steps:

1. Clone this repository to your local machine:
   
`https://github.com/R-Owino/ChattyDoc`

2. Navigate to the project directory:

`cd ChattyDoc`

3. Install dependencies for both the client and server:

```
# Install client dependancies

cd client

npm install

#Install server dependacies

cd server

pip install -r requirements.txt
```

## Usage
1. Start the server:

```
cd server
python3 main.py
```

2. Start the client:

```
cd client
npm start
```
3. Start the Mongo database

```
mongod
```
4. Register, login and start communicating

## Authors
#### Rehema Owino

#### Robert Ndungu

## License
This project is licensed under the MIT License - see the LICENSE file for details.
