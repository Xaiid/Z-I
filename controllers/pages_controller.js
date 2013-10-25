module.exports = {
  index: function(req,res){
    res.render('pages/index');
  },

  login: function(req,res){
    res.render('pages/login');
  },

  game: function(req,res){
    res.render('pages/game');
  },
};
