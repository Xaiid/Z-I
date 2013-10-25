var pagesController = require('../controllers/pages_controller');

module.exports = function(app){
  app.get('/', pagesController.index.bind(pagesController));
  app.get('/login', pagesController.login.bind(pagesController));
  app.get('/game', pagesController.game.bind(pagesController));

  //Game actions
  app.post('/user/create', user_controller.create.bind(user_controller));
};
