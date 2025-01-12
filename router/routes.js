
function router(app) {
    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/logout', require('./logout'))
    app.use('/file', require('./file'))
}

module.exports = router
