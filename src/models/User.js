const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { MONGODB_URI } = require('../config/env-vars');

const userSchema = mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        minlength: 3
    },
    password: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        // the passwordHash should not be revealed
        delete returnedObject.password;
    }
});

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

module.exports = mongoose.model('User', userSchema);
