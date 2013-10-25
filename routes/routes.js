var pagesController = require('../controllers/pages_controller');

module.exports = function(app){
  app.get('/', pagesController.index.bind(pagesController));
  app.get('/login', pagesController.login.bind(pagesController));
  app.get('/game', pagesController.game.bind(pagesController));
};
