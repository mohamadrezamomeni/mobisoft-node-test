const passport = require('passport');
module.exports = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
        next();
    });
    require('./passport')(passport);
    app.use(passport.initialize());
    app.use((req, res, next) => {
        req.base = {
            result: [],
            message: "",
        };
        next()
    });
};