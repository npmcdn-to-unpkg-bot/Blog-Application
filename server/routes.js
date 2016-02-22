var userController = require('./controllers/user.controller'),
    postController = require('./controllers/post.controller'),
    commentController = require('./controllers/comment.controller');
module.exports = function(app){
    app.post('/api/register', userController.tokenMiddleware, userController.registerUser);
    app.post('/api/login', userController.authenticateUser);
    app.post('/api/posts/create', userController.tokenMiddleware, postController.addArticle);
    app.get('/api/posts', postController.getArticles);
    app.put('/api/posts/:id', userController.tokenMiddleware, postController.updateArticle);
    app.get('/api/posts/:id', postController.showArticle);
    app.delete('/api/posts/:id', userController.tokenMiddleware, postController.destroyArticle);

    app.post('/api/posts/:id/comments', commentController.storeComment);
}
