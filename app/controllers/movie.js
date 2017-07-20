var Movie = require('../models/movie');
var _ = require('underscore');

// detail page
exports.detail = (req, res) => {
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
}



// list pages
exports.list = (req, res) => {
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
}


//admin new page
exports.new = (req, res) => {

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
}



//admin update movie
exports.update = function(req,res){
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie){
      res.render('admin', {
        title: 'imooc后台更新页',
        movie: movie
      })
    })
  }
}


// admin post movie
exports.save = function(req, res){
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
}



//list delete movie
exports.del = function(req, res){
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
}
