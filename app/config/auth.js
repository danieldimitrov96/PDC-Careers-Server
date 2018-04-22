const passportJWT = require('passport-jwt');
const config = require('./index');

const ExtractJwt = passportJWT.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: config.JWT_SECRET,
};

module.exports = {
    options,
};
