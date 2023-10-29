const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { registerUser, loginUser } = require('./controllers/users');
const { CreateProduct, getProducts } = require('./controllers/products');
const { verifyUserToken } = require('./middleware/middleware');
const { responseNotification } = require('./controllers/notification');

mongoose.connect('mongodb://127.0.0.1:27017/cargoa')
.then(() => {
    console.log('MONGO CONNECTION OPENED');
})
.catch((err) => {
    console.log('ERROR ERROR ERROR', err);
})

app.use(express.json())

app.post('/register', registerUser)
app.post('/login', loginUser)
app.post('/createproduct', verifyUserToken, CreateProduct)
app.post('/check/:id', verifyUserToken, responseNotification)
app.get('/myproducts', verifyUserToken, getProducts)


app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
})