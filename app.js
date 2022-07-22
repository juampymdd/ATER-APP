const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { pfx} = require('./config');
const https = require('https');
const status = `El servidor se encuentra corriendo en el puerto ${port}`
const routes = require('./routes');
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(routes)
app.get('/status', (req, res) => {
    res.send(status);
})


https.createServer(
    {
        pfx: pfx,
        passphrase: '',
        rejectUnauthorized: false
    }, app)
    .listen(port, () => {
        console.log(status);
    })
    .on('error', (err) => {
        console.log(err);
    });
