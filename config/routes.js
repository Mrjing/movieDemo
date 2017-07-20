var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
// var Movie = require('../models/movie');
// var User = require('../models/user');
// var _ = require('underscore');

module.exports = function(app){
  //pre handle user
  app.use(function(req, res, next){
    var _user = req.session.user;

    if(_user){
      app.locals.user = _user;
    }
    next()
  })

  // index page
  app.get('/', Index.index);

  //signup
  app.post('/user/signup', User.signup)


  //signin
  app.post('/user/signin', User.signin)

  //logout
  app.get('/logout', User.logout)


  // userlist pages
  app.get('/admin/userlist', User.list);

  // detail page
  app.get('/movie/:id', Movie.detail);

  // list pages
  app.get('/admin/list', Movie.list);

  //
  app.get('/admin/new', Movie.new);


  //admin update movie
  app.get('/admin/update/:id', Movie.update)

  // admin post movie
  app.post('/admin/movie/new', Movie.save)

  //list delete movie
  app.delete('/admin/list', Movie.del)
}

