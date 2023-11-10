const jwt = require('jsonwebtoken');

exports = {};

exports.getToken = async (email, user) => {
    //Assume thsi code is complete
    const token = jwt.sign({ 
        identifier: user._id}, 
        process.env.SECRET_PASSPORT_KEY,
    );
    return token;
};

module.exports = exports