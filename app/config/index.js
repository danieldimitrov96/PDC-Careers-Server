/* eslint-disable */
const port = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'development';
let url = null;

if (env === 'development') {
    url = 'mongodb://localhost/pdc';
} else if (env === 'production') {
    url = 'mongodb://shdwskip:mnogoslojnaparola123@ds113936.mlab.com:13936/pdc';
}

module.exports = {
    port,
    url,
};
