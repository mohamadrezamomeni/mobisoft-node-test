const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const encrypt = require('../helper/encryption').encrypt;
const createError = require('http-errors');

module.exports = router;


router.post('/login',(req, res, next)=>{
    User.findOne({Username: req.body.username},(err, user)=>{
        if(err){
            next(createError(500, "error occurred when finding user"));
        }
        if(user){
            user.comparePassword(req.body.password,(error, isMatch)=>{
                if(error){
                    next(createError(500,"error occurred when comparing password"))
                }else if(isMatch){
                    var token = jwt.sign({id: encrypt(user._id)}, process.env.SECRET_KEY,{ expiresIn: 60 * 60});``
                    return res.json(Object.assign(req.base,{
                        result:{
                            username: user.Username,
                            token: token
                        }
                    }));
                }else{
                    return res.json(Object.assign(req.base,{
                        message: "login failed"
                    }));
                }
            })
        }
    })
});