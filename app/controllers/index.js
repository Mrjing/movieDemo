var Movie = require('../models/movie');

exports.index = function(req, res){
  // index page
  console.log('user in session:')
  console.log(req.session.user)

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
  
}

