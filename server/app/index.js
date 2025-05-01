const express = require('express');
const morgan = require('morgan');
const app = express();
const routeHandler = require('./routes');

app.use(express.json());
app.use(morgan('dev'));

app.get ('/', (req, res) => {  
    console.log('API is running'); 
res.status(200).json({ message: "API is running", succes: true});
});

app.get ('/', (req, res) => {
    console.error('Error: API not found');
    res.status(404).json({ message: "API not found", success: false });  
});

app.use('/api/v1', routeHandler);

module.exports = app;