const db = require('.././services/db');
var BookSchema = new db.Schema({
    Title: {type:String ,required: true},
    Author: {type:String, required: true},
    Category: {type:String, required: true}
}, {
    collection: 'Book',
    timestamps: true
});

module.exports = db.model('Book', BookSchema);