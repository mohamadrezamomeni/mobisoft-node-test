const db = require('.././services/db');
const bcrypt = require('bcrypt');
var UserSchema = new db.Schema({
    Username: {type: String, required: true, unique: true},
    Password: {type: String, required: true},
    Email: {type: String, required: false, unique: true},
    Name: {type: String, required: true}

}, {
    collection: 'User',
    timestamps: true
});
UserSchema.pre('save', function (next) {

    var user = this;
    if (this.isModified('Password') || this.isNew) {

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.Password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.Password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.Password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });
};
module.exports = db.model('User', UserSchema);