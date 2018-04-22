const passportJWT = require('passport-jwt');
const passport = require('passport');
const config = require('./index');
const {
    User,
} = require('../db/models');


const init = (app) => {
    const opts = {};
    const JwtStrategy = passportJWT.Strategy;
    const ExtractJwt = passportJWT.ExtractJwt;
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.JWT_SECRET;
    passport.use(new JwtStrategy(opts, async (jwtPayload, next) => {
        const user = await User.findById(jwtPayload.id);

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    }));
    app.use(passport.initialize());
};
module.exports = {
    init,
    // opts,
};
