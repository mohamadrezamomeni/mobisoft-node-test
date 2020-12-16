module.exports = (app) => {
    app.use(`/api/${process.env.VERSION}/auth`, require('./auth'));
    app.use(`/api/${process.env.VERSION}`, require('./register'));
    app.use(`/api/${process.env.VERSION}/book`, require('./book'));
};