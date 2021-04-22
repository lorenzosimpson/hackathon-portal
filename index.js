const dotenv = require('dotenv').config();
const server = require('./Api/server.js');
const port = process.env.SERVER_PORT;


server.listen(port, () => console.log(`Server running on port ${port}!`));
