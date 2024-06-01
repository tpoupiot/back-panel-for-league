const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.js');

const championRoutes = require('./routes/champions.js');

mongoose.connect(config.mongodbUri)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/champions', championRoutes);

const port = config.port;

app.listen(port, () => {
    console.log(`Server is running on port ${port} on http://localhost:${port}/`);
});
