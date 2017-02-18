'use strict'
//Database 
var mongoose = require('mongoose');
var db = 'mongodb://localhost/imooc-app-server';

mongoose.Promise = require('bluebird');
mongoose.connect(db);

var createDB = true;
if(createDB){
    require('./user')
}
