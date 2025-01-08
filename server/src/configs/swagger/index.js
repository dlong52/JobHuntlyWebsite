const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require('dotenv');
dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", 
    info: {
      title: "API Documentation",
      version: "1.0.0", 
      description: "API documentation for your application",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`, 
        description: "Development server",
      },
    ],
  },
  apis: ["../../routes/*.js"], 
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
