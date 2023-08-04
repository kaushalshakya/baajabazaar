const vendorRoutes = require('./vendorRoutes');
const customerRoutes = require('./customerRoutes.js');
const vendorAuthRoutes = require('./auth/vendorAuthRoutes');

module.exports = {
    vendorRoutes,
    customerRoutes,
    vendorAuthRoutes
}