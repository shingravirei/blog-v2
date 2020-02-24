const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: 'username already in use' });
    }
    res.status(400).send({ error: err.message });
};

module.exports = { errorHandler };
