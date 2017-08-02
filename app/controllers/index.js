var Movie = require('../models/movie');
var Category = require('../models/category')

exports.index = function(req, res){
  // index page
  console.log('user in session:')
  console.log(req.session.user)
  Category
    .find({})
    .populate({path: 'movies', options: {limit: 5}})
    .exec(function(err, categories){
      if(err){
        console.log(err)
      }
      res.render('index', {
        title: 'imooc 首页',
         categories: categories
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
  
}

exports.search = function(req, res){
  var catId = req.query.cat;
  var q = req.query.q;
  var page = parseInt(req.query.p, 10) || 0;
  var count = 2;
  var index = page * count;

  if(catId){
    Category
      .find({_id: catId})
      .populate({
        path: 'movies', 
        select: 'title poster'
      })
      .exec(function(err, categories){
        if(err){
          console.log(err)
        }
        var category = categories[0] || {};
        var movies = category.movies || [];
        var results = movies.slice(index, index+count);
        res.render('results', {
          title: 'imooc 结果列表页',
          keyword: category.name,
          currentPage: (page + 1),
          query: 'cat=' + catId,
          totalPage: Math.ceil(movies.length / count),
          movies: results
        });
      })
  }else{
    Movie
      .find({title: new RegExp(q + '.*', 'i')})
      .exec(function(err, movies){
        if(err){
          console.log(err)
        }
        var results = movies.slice(index, index+count);
        res.render('results', {
          title: 'imooc 结果列表页',
          keyword: q,
          currentPage: (page + 1),
          query: 'q=' + q,
          totalPage: Math.ceil(movies.length / count),
          movies: results
        });
      })
  }
}

