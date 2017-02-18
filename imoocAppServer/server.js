//require database
require('./app/models/create');

var koa = require('koa');
var logger = require('koa-logger');
var session = require('koa-session');
var bodyParser = require('koa-bodyparser');


//routes
var router = require('./config/routes')();

//app
var app = koa();

//middlewares
app.keys = ['yanglei'];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

//router
app.use(router.routes())
    .use(router.allowedMethods());

app.listen(1234);
console.log('server is running on port', 1234);


