const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const APP_SECRET = process.env.REACT_APP_APP_SECRET;
const USERNAME = process.env.REACT_APP_USERNAME;
const PASSWORD = process.env.REACT_APP_PASSWORD;

const annonOps = [
    { method: "GET", urls: ["/api/products", "/api/categories"] },
    { method: "POST", urls: ["/api/orders"] }
];

module.exports = (req, res, next) => {
    if (annonOps.find(op => op.method === req.method &&
        op.urls.find(url => req.url.startsWith(url)))) {
        next();
    } else if (req.url === "/login" && req.method === "POST") {
        if (req.body.username === USERNAME && req.body.password === PASSWORD) {
            res.json({
                success: true,
                token: jwt.sign({data: USERNAME, expiresIn: "1h"}, APP_SECRET)
            });
        } else {
            res.json({
                success: false
            });
        }
        res.end();
    } else {
        let token = req.headers["authorization"];
        if (token !== null && token.startsWith("Bearer<") ) {
            token = token.substring(7, token.length - 1);
            jwt.verify(token, APP_SECRET);
            next();
        } else {
            res.statusCode = 401;
            res.end();
        }
    }
}