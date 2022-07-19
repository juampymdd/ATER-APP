const router = require('express').Router();
const api1 = require('./api1');

router.use('/api',api1)

module.exports = router;

