const router = require('express').Router();
const User = require('../models/User');
const createError = require('http-errors');

module.exports = router;

router.post('/register', (req, res, next) => {
    var user = new User({
        Username: req.body.username,
        Password: req.body.password,
        Email: req.body.email,
        Name: req.body.name
    });
    user.save((err, save) => {
        if (err) {
            next(createError(500,"duplication input data"))
        }
        if (save) {
            return res.json(Object.assign(req.base, {
                result: {
                    username: req.body.username,
                    email: req.body.email,
                    name: req.body.name
                },
                message: "successful"
            }));
        } else {
            return res.json(Object.assign(req.base, {
                result: {},
                message: "not successful"
            }));
        }
    });
});

