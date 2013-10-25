var pagesController = require('../controllers/pages_controller');
var user_controller = require('../controllers/user_controller');

module.exports = function(app){
  app.get('/', pagesController.index.bind(pagesController));
  app.get('/login', pagesController.login.bind(pagesController));
  app.get('/game', pagesController.game.bind(pagesController));

  //Game actions
  app.post('/user/create', user_controller.create.bind(user_controller));

  app.get('/configuration', function(req, res){
    var configuration = require('../config/game');
    var query         = req.query.q;

    var data   = configuration[query];
    var status = data ? 200 : 404;

    res.send(status, data);
  });
};
