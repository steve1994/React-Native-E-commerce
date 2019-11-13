var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');

var fileUpload = require('express-fileupload');


var app = express();
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/react-native-ecommerce-db', {useNewUrlParser: true});

app.use(logger('dev'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/products', productsRouter);

module.exports = app;
