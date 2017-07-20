var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');

var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect(dbUrl)

app.set('views', './views/pages');//视图的默认目录

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
  extended: true
}))//提交表单时，将表单中的数据格式化

app.use(cookieParser())//cookie解析的中间件，一定要放到session中间件之前
app.use(session({//保存会话状态
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  }),
  resave: false,
  saveUninitialized: true
}))

if('development' === app.get('env')){
  app.set('showStackError', true)
  app.use(logger(':method :url :status'))
  app.locals.pretty = true
  mongoose.set('debug', true)
}


require('./config/routes')(app)

app.use(serveStatic('public'))//请求样式或js文件时，向bowercomponents中查找

app.locals.moment = require('moment');
app.listen(port);

console.log('imooc start on port ' + port);

