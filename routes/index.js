const vendorRoutes = require('./vendorRoutes');
const customerRoutes = require('./customerRoutes.js');
const vendorAuthRoutes = require('./auth/vendorAuthRoutes');
const customerAuthRoutes = require('./auth/customerAuthRoutes');

module.exports = {
    vendorRoutes,
    customerRoutes,
    vendorAuthRoutes,
    customerAuthRoutes
}