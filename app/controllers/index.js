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

