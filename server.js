const express = require('express');

const app = express();

require('dotenv').config();

const connectDb = require('./config/conectDb');
const init = require('./config/setup');

const ALALA = require('./routes/user.route');

app.use(express.json());

const PORT = 4000 || process.env.PORT;

connectDb();
init();
app.use('/api',ALALA);

app.listen(PORT,(err) => {
    err ? console.error(err) 
    : 
    console.log(`listen to port... ${PORT}`);
});
