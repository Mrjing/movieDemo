var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var path = require('path');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc')

app.set('views', './views/pages');//视图的默认目录

app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({
  extended: true
}))//提交表单时，将表单中的数据格式化

app.use(serveStatic('public'))//请求样式或js文件时，向bowercomponents中查找

app.locals.moment = require('moment');
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

//signup
app.post('/user/signup', function(req, res){
  var _user = req.body.user;

  User.find({name: _user.name}, function(err, user){
    if(err){
      console.log(err)
    }
    console.log('****')
    console.log(user)
    if(user.length){
      console.log("user已存在");
      res.redirect('/')
    }else{
      console.log("user不存在");
      var user = new User(_user);
      user.save(function(err, user){
        if(err){
          console.log(err)
        }
        res.redirect('/admin/userlist')
      })
    }
  })
  
  ///user/signup/:userid  可通过req.params.userid获取
  ///user/signup/111?userid=11  可通过req.query.userid获取
  //
  //
  console.log(_user)
})

// userlist pages
app.get('/admin/userlist', (req, res) => {
  User.fetch(function(err, users){
    if(err){
      console.log(err)
    }
    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users 
      // [{
      //   title: '机械战警',
      //   _id: 1,
      //   doctor: '何塞趴地利亚',
      //   country: '美国',
      //   year: 2014,
      //   language: '英语',
      //   flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
      // }]
    });
  })
});

// detail page
app.get('/movie/:id', (req, res) => {
  console.log('idxinxi:', req.params.id);
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie) {
      console.log("movie详情:", movie);
      if (err) {
        console.log(err);
        console.log("在这里出现了错误");
        return;
      }
      res.render('detail', {
        title: 'imooc ' + movie.title,
        movie: movie
      });
    });
  }
});

// list pages
app.get('/admin/list', (req, res) => {
  Movie.fetch(function(err, movies){
    if(err){
      console.log(err)
    }
    res.render('list', {
      title: 'imooc 列表页',
      movies: movies 
      // [{
      //   title: '机械战警',
      //   _id: 1,
      //   doctor: '何塞趴地利亚',
      //   country: '美国',
      //   year: 2014,
      //   language: '英语',
      //   flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf'
      // }]
    });
  })
});

//
app.get('/admin/new', (req, res) => {

  res.render('admin', {
    title: 'imooc 后台录入页',
    movie:  {
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


//admin update movie
app.get('/admin/update/:id', function(req,res){
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin', {
        title: 'imooc后台更新页',
        movie: movie
      })
    })
  }
})

// admin post movie
app.post('/admin/movie/new', function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if(id !== 'undefined'){
    console.log("已存在的");
    Movie.findById(id, function(err, movie){
      if(err){
        console.log(err)
      }
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      })
    })
  }else{
    console.log("新生成的");
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash,
    });
    _movie.save(function(err, movie) {
      if(err){
        console.log(err);
      }
      console.log("**********")
      console.log(movie);
      res.redirect('/movie/' + movie._id);
    })
  }
})

//list delete movie
app.delete('/admin/list', function(req, res){
  var id = req.query.id
  if(id){
    Movie.remove({_id: id}, function(err, movie){
      if(err){
        console.log(err);
      }else{
        res.json({success: 1})
      }
    })
  }
})