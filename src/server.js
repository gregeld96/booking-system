require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';
const routes = require('./routes');
const error = require('./middlewares/error');

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(routes);
app.use(error);

app.listen(PORT, IP, () => {
    console.log(`Server run on http://${IP}:${PORT}`)
})