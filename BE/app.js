const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const user = require('./routes/User');
const message = require('./routes/message');
const comment = require('./routes/comment');
const app = express();


const db = require("./models/index");

/* db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
}); */
var corsOptions = {
    origin: "http://192.168.1.129:8080"
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', user);
app.use('/api/message', message);
app.use('/api/comment', comment);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});