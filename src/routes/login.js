const Router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { SECRET } = require('../config/env-vars');

Router.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        const passwordCorrect =
            user === null
                ? false
                : await bcrypt.compare(password, user.password);

        if (!(user && passwordCorrect)) {
            throw new Error('invalid username or password');
        }

        const userForTonken = {
            username: user.username,
            id: user._id
        };

        const token = jwt.sign(userForTonken, SECRET);

        res.status(200).send({
            token,
            username: user.username,
            name: user.name
        });
    } catch (err) {
        next(err);
    }
});

module.exports = Router;
