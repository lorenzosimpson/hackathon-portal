const dotenv = require('dotenv').config();
const server = require('./Api/server.js');
const clientSecret = process.env.CLIENT_SECRET;
const port = 3001;


server.listen(port, () => console.log(`Server running on port ${port}!`));
