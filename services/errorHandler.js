var createError = require('http-errors');
module.exports = (app) => {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
        console.log(err.message);
        return res.status(err.status || 500).json(Object.assign(req.base,{
            message: err.message
        }));
    });
};