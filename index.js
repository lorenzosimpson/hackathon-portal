const dotenv = require('dotenv').config();
const server = require('./Api/server.js');
const port = process.env.PORT;
const path = require('path')
const express = require('express')

if (process.env.NODE_ENV === "production" ) {
    server.use(express.static(path.join(__dirname, 'build')));
    server.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+ '/build/index.html'));
    });
}
 
server.listen(port, () => console.log(`Server running on port ${port}!`));
