var Movie = require('../models/movie');
var Category = require('../models/category')
var Comment = require('../models/comment');
var _ = require('underscore');
var fs = require('fs')
var path = require('path')


// detail page
exports.detail = (req, res) => {
  console.log('idxinxi:', req.params.id);
  var id = req.params.id;
  if(id){
    Movie.update({_id:id}, {$inc: {pv:1}}, function(err){
      if(err){
        console.log(err)
      }
    })

    Movie.findById(id, function(err, movie) {

      console.log("movie详情:", movie);
      if (err) {
        console.log(err);
        console.log("在这里出现了错误");
        return;
      }
      Comment
      .find({movie: id})//先找到评论这部电影的评论
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(function(err, comments){
        // console.log(comments)
        res.render('detail', {
          title: 'imooc ' + movie.title,
          movie: movie,
          comments: comments
        });
      })
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
  Category.find({}, function(err, categories){
    res.render('admin', {
      title: 'imooc 后台录入页',
      categories: categories,
      movie: {}
    });
  })
  
}



//admin update movie
exports.update = function(req,res){
  var id = req.params.id;
  if(id){
    Movie.findById(id, function(err, movie){
      Category.find({}, function(err, categories){
        res.render('admin', {
          title: 'imooc后台更新页',
          movie: movie,
          categories: categories
        })
      })
    })
  }
}

//admin poster
exports.savePoster = function(req, res, next){
  var posterData = req.files.uploadPoster
  var filePath = posterData.path
  var originalFilename = posterData.originalFilename

  if(originalFilename){
    fs.readFile(filePath, function(err, data){
      var timestamp = Date.now()
      var type = posterData.type.split('/')[1]
      var poster = timestamp + '.' + type
      var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)
      
      fs.writeFile(newPath, data, function(err){
        req.poster = poster;
        next()
      })
    })
  }
  else {
      next()
  }
}

// admin post movie
exports.save = function(req, res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if (req.poster){
    movieObj.poster = req.poster
  }

  if(id){
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
    _movie = new Movie(movieObj);
    var categoryId = movieObj.category
    var categoryName = movieObj.categoryName
    _movie.save(function(err, movie) {
      if(err){
        console.log(err);
      }

      if(categoryId){
        Category.findById(categoryId, function(err, category){
          category.movies.push(movie._id)
          category.save(function(err, category){
            res.redirect('/movie/' + movie._id);
          })
        })
      }else if(categoryName){
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        })


        category.save(function(err, category){
          movie.category = category._id;
          movie.save(function(err, movie){
            res.redirect('/movie/' + movie._id);
          })
          
        })
      }
      
      
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
