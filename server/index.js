// Library
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const dotenv = require("dotenv");
dotenv.config();

// Route
const routes = require("./src/routes");

// Config
const database = require("./src/configs/database");
const { checkElastic } = require("./src/configs/elasticsearch");
const { initSocket } = require("./src/configs/socket");

// APP
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const allowedOrigins = [
  "https://jobhuntlyclient.vercel.app",
  "http://localhost:8000",
];

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
// Connect database
database.connect();

routes(app);

// Check connect elasticsearch
checkElastic();

// Innit socket
initSocket(server);

// Server listening
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
