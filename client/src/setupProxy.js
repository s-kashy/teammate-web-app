const proxy = require('http-proxy-middleware')

module.exports = function (app) {

    app.use(proxy('/api/auth/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/profile/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/email/*', { target: 'http://localhost:5000' }))
    app.use(proxy('/api/team/*', { target: 'http://localhost:5000' }))
}
