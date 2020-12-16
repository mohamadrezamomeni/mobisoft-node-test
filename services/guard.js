const passport = require('passport');

module.exports = (req, res, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return res.json(Object.assign(req.base, {
                result: [],
                message: 'authorization failed'
            }));
        }

        if (!user) {
            return res.json(Object.assign(req.base, {
                result: [],
                message: 'authorization failed'
            }));
        }else{
            req.user = user;
            next();
        }
    })(req, res, next);
};