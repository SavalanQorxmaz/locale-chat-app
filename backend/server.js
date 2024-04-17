const express = require('express');
const app = express();

const {createServer} = require('http');


const server = new createServer(app);


server.listen(8000, ()=>{
    console.log('http://localhost:8000');
})