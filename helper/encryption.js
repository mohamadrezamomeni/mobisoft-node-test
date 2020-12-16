const Cryptr = require('cryptr'),
    algorithm = 'aes-256-ctr',
    secret = process.env.SECRET_KEY;

function encrypt(text) {
    var cipher = new Cryptr(secret);
    return cipher.encrypt(text)
}

function decrypt(text) {
    var cipher = new Cryptr(secret);
    return cipher.decrypt(text)
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;