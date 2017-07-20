var User = require('../models/user');

//signup
exports.signup = function(req, res){
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
}



  //signin
exports.signin = function(req, res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;
  User.findOne({name:name}, function(err,user){
    console.log('user********')
    console.log(user)
    if(err){
      console.log(err)
    }
    if(!user){
      return res.redirect('/')
    }
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log(err)
      }
      if(isMatch){
        console.log('password is matched')
        req.session.user = user;
        return res.redirect('/')
      }
      else{
        console.log('password is not matched')
      }
    })
  })
}


  //logout
exports.logout = function(req, res){
  delete req.session.user
  // delete app.locals.user
  res.redirect('/')
}


  // userlist pages

exports.list = (req, res) => {
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
}

