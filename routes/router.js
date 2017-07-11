module.exports = function(app) {
    app.use('/', require('./index'));
    app.use('/users', require('./users'));
    app.use('/signup',require('./signup'));//注册
    app.use('/signin',require('./signin'));//登录
    app.use('/post',require('./post'));//发表文章
}