var userController = require('./controllers/user.controller'),
    postController = require('./controllers/post.controller');
module.exports = function(app){
    app.post('/api/register', userController.tokenMiddleware, userController.registerUser);
    app.post('/api/login', userController.authenticateUser);
    app.post('/api/posts/create', userController.tokenMiddleware, postController.addArticle);
    app.get('/api/posts', postController.getArticles);
}
