const User = require('../models/User');
const decrypt = require('../helper/encryption').decrypt;
module.exports = (passport) => {
    var JwtStrategy = require('passport-jwt').Strategy,
        ExtractJwt = require('passport-jwt').ExtractJwt;
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET_KEY;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: decrypt(jwt_payload.id)}, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};