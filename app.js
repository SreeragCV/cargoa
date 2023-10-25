const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./controllers/users')

mongoose.connect('mongodb://127.0.0.1:27017/cargoa')
.then(() => {
    console.log('MONGO CONNECTION OPENED');
})
.catch((err) => {
    console.log('ERROR ERROR ERROR', err);
})

app.use(express.json())

app.post('/create', user.registerUser)
app.post('/login', user.loginUser)


app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})