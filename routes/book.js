const router = require('express').Router();
const guard = require('../services/guard');
const Book = require('../models/Book');
const request = require('request');
const createError = require('http-errors');


module.exports = router;

router.put('/create', guard, (req, res, next) => {
    let book = new Book({
        Category: req.body.category,
        Title: req.body.title,
        Author: req.body.author,
    });
    book.save((err, save) => {
        if (err) {
            next(createError(500,"error to save"))
        }
        if (save) {
            res.json(Object.assign(req.base, {
                result: {
                    category: req.body.category,
                    title: req.body.title,
                    author: req.body.author,
                }
            }));
        }
    })
});

router.get('/search', guard, (req, res, next) => {
    const {author, category, title} = req.query;
    var searchBookUrl = `${process.env.SEARCH_BOOK_URL}${title}`;
    request(searchBookUrl, (err, response, body) => {
        if (err) {
            next(createError(500, "problem in request another server"))
        }
        if (body) {
            let bodyObject = JSON.parse(body);
            let items = bodyObject.items;
            let resultBooks = [];
            for (let item of items) {
                if (author) {
                    try {
                        if (item.volumeInfo.authors.includes(author)) {
                            resultBooks.push(item.volumeInfo)
                        }
                    } catch (e) {
                    }
                }
                if (category) {
                    try {
                        if (item.volumeInfo.categories.includes(category)) {
                            resultBooks.push(item.volumeInfo)
                        }
                    } catch (e) {
                    }
                }
                return res.json(Object.assign(req.base, {
                    result: resultBooks
                }));
            }
        } else {
            return res.json(Object.assign(req.base, {
                message: "not get response"
            }));
        }
    });
});

router.get('/filter', guard, (req, res, next) => {
    const {author, category, title} = req.query;
    let query = {$or: []};
    if (author) {
        query.$or.push({'Author': author})
    }
    if (category) {
        query.$or.push({'Category': category})
    }
    if (title) {
        query.$or.push({'Title': title})
    }
    Book.find(query, (err, data) => {
        if (err) {
            next(createError(500, "error to filter book"));
        }
        if (data) {
            res.json(Object.assign(req.base, {
                result: data
            }));
        }
    })
});

