/* eslint-disable */
const config = (function () {
    const PORT = process.env.PORT || 3001;
    const env = process.env.NODE_ENV || 'development';
    let URL = null;

    const PAGE_SIZE = 10;
    const JWT_SECRET = 'truesecret';
    const JWT_ISSUER = 'pdincorporated';
    const JWT_EXPIRE_TIME = 172800;

    if (env === 'development') {
        URL = 'mongodb://localhost/pdc';
    } else if (env === 'production') {
        URL = 'productionUrl';
    }

    return {
        PORT,
        URL,
        JWT_SECRET,
        JWT_ISSUER,
        JWT_EXPIRE_TIME,
        PAGE_SIZE,
    }
})();

module.exports = {
    PORT: config.PORT,
    URL: config.URL,
    JWT_SECRET: config.JWT_SECRET,
    JWT_ISSUER: config.JWT_ISSUER,
    JWT_EXPIRE_TIME: config.JWT_EXPIRE_TIME,
    PAGE_SIZE: config.PAGE_SIZE,
};
