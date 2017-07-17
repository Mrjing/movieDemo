var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');//视图的默认目录

app.set('view engine', 'jade');


app.use(bodyParser.urlencoded())//提交表单时，将表单中的数据格式化

app.use(serveStatic('bower_components'))//请求样式或js文件时，向bowercomponents中查找

app.listen(port);

console.log('imooc start on port ' + port);

// index page
app.get('/', (req, res) => {
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err)
    }
    res.render('index', {
      title: 'imooc 首页',
       movies: movies
    });
  }) 
  
  //{
    //   title: '机械战警',
    //   _id: 1,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // },{
    //   title: '机械战警',
    //   _id: 2,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // },{
    //   title: '机械战警',
    //   _id: 3,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // },{
    //   title: '机械战警',
    //   _id: 4,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // },{
    //   title: '机械战警',
    //   _id: 5,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // },{
    //   title: '机械战警',
    //   _id: 6,
    //   poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // }
});

// detail page
app.get('/movie/:id', (req, res) => {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'imooc ' + movie.title,
      movie: movie
    });
  })
  
});

// list page
app.get('/admin/list', (req, res) => {
  res.render('list', {
    title: 'imooc 列表页',
    movies: [{
      title: '机械战警',
      _id: 1,
      doctor: '何塞趴地利亚',
      country: '美国',
      year: 2014,
      language: '英语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
    }]
  });
});

// list page
app.get('/admin/movie', (req, res) => {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});


// admin post movie
app.post('/admin/movie/new', function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if(id !== 'undefined'){
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err)
      }
      _movie = 
    })
  }
})