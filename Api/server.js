const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const apiRouter = require('../routers/api-router')
var jwt = require('express-jwt');
var jwksRsa = require('jwks-rsa');
const axios = require('axios');
const authConfig = require('../src/auth_config.json')


const clientOrigin = process.env.CLIENT_ORIGIN;
const server = express();
const audience = authConfig.audience
server.use(cors({ origin: clientOrigin }));
server.use(helmet());
server.use(express.json());



const checkJwt = jwt({
   secret: jwksRsa.expressJwtSecret({
     cache: true,
     rateLimit: true,
     jwksRequestsPerMinute: 5,
     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
   }),
 
   audience: authConfig.audience,
   issuer: `https://${authConfig.domain}/`,
   algorithms: ["RS256"],
 });


server.get('/authorized', function (req, res) {
 res.send('Secured Resource');
});

server.use('/api', checkJwt, apiRouter)



server.get("/api/external", checkJwt, (req, res) => {
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
          client_id: process.env.API_CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: audience,
          grant_type: 'client_credentials'
       }
    })
       .then(response => {
           token = (response.data.access_token)
           res.status(200).json({access_token: token})
       })
       .catch(err => {
          res.status(500).json("Could not get a token from the server /token endpoint")
          console.log(err)
       });
      
 } catch (err) {
    console.log(err);
 }
})


module.exports = server;
