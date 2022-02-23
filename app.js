const express = require('express');

const logger = require('morgan');

const app = express();

app.get('/', (req, res, next) => {
    res.json({message: 'welcome to the demo'})
})

app.listen(7070, _ => console.log('started'))