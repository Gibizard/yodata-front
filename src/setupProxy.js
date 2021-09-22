const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(["/yodata", "/rest"], createProxyMiddleware({
        target: "http://localhost:8888",
        logLevel: "debug",
        changeOrigin: true
    }))
}