const express = require('express');
const app = express();
const host = 'localhost';
const port = 5500;
app.use(express.static('public'))
app.listen(port,host,() =>{
    console.log(`server is listen on http://${host}:${port}`);
})