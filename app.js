const express = require("express");
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const championsRoutes = require('./routes/champions');

async function run() {
    try {
        await mongoose.connect(config.get('mongodbUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB!");

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.use('/champions', championsRoutes);

        app.listen(config.get('port'), () => {
            console.log(`Server is running on port ${config.get('port')} on http://localhost:${config.get('port')}/`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run().catch(console.dir);
