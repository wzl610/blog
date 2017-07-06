module.exports = function(app) {
    app.use('/', require('./index'));
    app.use('/users', require('./users'));
}