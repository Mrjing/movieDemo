var Category = require('../models/category')





// list pages
exports.list = (req, res) => {
  Category.fetch(function(err, categories){
    if(err){
      console.log(err)
    }
    res.render('categorylist', {    
      title: 'imooc 分类列表页',
      categories: categories 
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

  res.render('category_admin', {
    title: 'imooc 后台分类录入页',
    category: {}
  });
}






// admin post movie
exports.save = function(req, res){
  var _category = req.body.category;

  var category = new Category(_category)
    
    category.save(function(err, categories) {
      if(err){
        console.log(err);
      }
      res.redirect('/admin/category/list');
    })
  
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
