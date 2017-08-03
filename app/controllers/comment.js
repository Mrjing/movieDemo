var Comment = require('../models/comment');
var Movie = require('../models/movie')
// comment
exports.save = function(req, res){
  var _comment = req.body.comment;
  var movieId = _comment.movie;

  if(_comment.cid){
    Comment.findById(_comment.cid, function(err, comment){
      var reply = {
        from: _comment.from,
        to: _comment.tid,
        content: _comment.content
      }
      comment.reply.push(reply);

      comment.save(function(err, comment) {
        if(err){
          console.log(err);
        }
        console.log("**********comment")
        console.log(comment)
        res.redirect('/movie/' + movieId);
      })
    });
  }else{
    var comment = new Comment(_comment);
  
    comment.save(function(err, comment) {
      if(err){
        console.log(err);
      }
      console.log("**********")
      res.redirect('/movie/' + movieId);
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
