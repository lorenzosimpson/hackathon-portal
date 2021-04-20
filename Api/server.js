const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('../routers/api-router')
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const authConfig = require("../src/auth_config.json");
const axios = require('axios');

const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;
const server = express();
server.use(cors({ origin: appOrigin }));
server.use(helmet());
server.use(express.json());



var jwtCheck = jwt({
   secret: jwks.expressJwtSecret({
       cache: true,
       rateLimit: true,
       jwksRequestsPerMinute: 5,
       jwksUri: 'https://dev-kwqdx1i8.us.auth0.com/.well-known/jwks.json'
 }),
 audience: 'http://localhost:3001',
 issuer: 'https://dev-kwqdx1i8.us.auth0.com/',
 algorithms: ['RS256']
});


server.get('/authorized', function (req, res) {
 res.send('Secured Resource');
});

server.use('/api', jwtCheck, apiRouter)

server.get('/', (req, res) => {
   res.send('Server is running!');
});

server.get("/api/external", jwtCheck, (req, res) => {
   res.send({
      msg: "Your Access Token was successfully validated!"
   });
});

server.get('/token', async (req, res) => {
   let token;
   try {
   await axios({
       method: 'post',
       url: "https://dev-kwqdx1i8.us.auth0.com/oauth/token",
       headers: {
          'content-type': 'application/json',
       },
       data: {
          client_id: 'ToIab8cKdScRSDRoGL4ZId6qifYGQH9d',
          client_secret: process.env.CLIENT_SECRET,
          audience: "http://localhost:3001",
          grant_type: 'client_credentials'
       }
    })
       .then(response => {
           token = (response.data.access_token)
           res.status(200).json({access_token: token})
       })
       .catch(err => console.log(err));
      
 } catch (err) {
    console.log(err);
 }
})

module.exports = server;
