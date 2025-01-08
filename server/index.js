// Library
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http'); 
const socketIo = require('socket.io');
const dotenv = require('dotenv');
dotenv.config();

// Route
const routes = require('./src/routes');

// Config
const database = require('./src/configs/database');
const {checkElastic} = require('./src/configs/elasticsearch');
const { initSocket } = require('./src/configs/socket');
const { swaggerUi, swaggerDocs } = require("./src/configs/swagger");


// APP
const app = express();
const server = http.createServer(app); 
const port = process.env.PORT || 5000;
const allowedOrigins = ["http://localhost:8000"];

// Swagger API
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// CORS
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }  
  },
  credentials: true,
}));

app.use(bodyParser.json());  
app.use(cookieParser());
// Connect database
database.connect();

routes(app);
// Check connect elasticsearch
checkElastic()
// Innit socket
initSocket(server)

// Server listening
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
