const vendorRoutes = require('./vendorRoutes');
const customerRoutes = require('./customerRoutes.js');
const vendorAuthRoutes = require('./auth/vendorAuthRoutes');
const customerAuthRoutes = require('./auth/customerAuthRoutes');
const productRoutes = require('./productRoutes');
const cartRoutes = require('./cartRoutes');
const homePageRoute = require('./homePageRoute');
const orderRoutes = require('./orderRoutes');

module.exports = {
    vendorRoutes,
    customerRoutes,
    vendorAuthRoutes,
    customerAuthRoutes,
    productRoutes,
    cartRoutes,
    homePageRoute,
    orderRoutes
}