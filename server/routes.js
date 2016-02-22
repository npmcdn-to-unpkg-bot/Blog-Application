var userController = require('./controllers/user.controller');
module.exports = function(app){
    app.post('/api/register', userController.tokenMiddleware, userController.registerUser);
    app.post('/api/login', userController.authenticateUser);
}
