const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 201;
            res.header('Access-Control-Allow-Origin', ['*']);
            if (!err) {
                const { name, password } = req.body;
                const user = new User({ name, password});
                user.save((err, user) => {
                    if(!err) {
                        result.status = status;
                        result.result = user;
                    } else {
                        status = 500;
                        result.status = status;
                        result.error = err;
                    }
                    res.status(status).send(result);
                });
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },

    login: (req, res) => {
        const {name, password } = req.body;
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 200;
            if(!err) {
                User.findOne({name}, (err, user) => {
                    if (!err && user) {
                        bcrypt.compare(password, user.password).then(match => {
                            if (match) {
                                status = 200;
                                const payload = {user: user.name};
                                const options = { expiresIn: '2d', issuer: 'TheBigR'};
                                const secret = process.env.JWT_SECRET;
                                result.token = jwt.sign(payload, secret, options);
                                result.status = status;
                                result.result = user;
                            } else {
                                status = 401;
                                result.status = status;
                                result.error = 'Authentication error';
                            }
                            res.status(status).send(result);
                        }).catch(err => {
                            status = 500;
                            result.status = status;
                            result.error = err;
                            res.status(status).send(result);
                        });
                    } else {
                        status = 404;
                        result.status = status;
                        result.error = 'User not found';
                        res.status(status).send(result);
                    }
                });
            }
        })
    },

    getAll: (req, res) => {
        mongoose.connect(connUri, {useNewUrlParser: true}, (err) => {
            let result = {};
            let status = 200;
            if (!err) {
                const payload = req.decoded;
                if (payload && payload.user === 'admin') {
                    User.find({}, (err, users) => {
                        if(!err) {
                            result.status = status;
                            result.error = err;
                            result.result = users;
                        } else {
                            status = 500;
                            result.status = status;
                            result.error = err;
                        }
                        res.status(status).send(result);
                    });
                } else {
                    status = 401;
                    result.status = status;
                    result.error = 'Authentication error';
                    res.status(status).send(result);
                }
            } else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    },
    init: (req, res) => {
        res.sendFile(path.join(__dirname + '/../pages/index.html'));
    },
    register: (req, res) => {
        res.sendFile(path.join(__dirname + '/../pages/register.html'));
    },
    signin: (req, res) => {
        res.header('Access-Control-Allow-Origin', ['*']);
        res.header('Access-Control-Allow-Headers',['application/json']);
        res.header('Access-Control-Allow-Methods',['GET','POST']);
        res.sendFile(path.join(__dirname + '/../pages/signin.html'));

    }
};

