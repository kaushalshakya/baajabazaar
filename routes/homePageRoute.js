const router = require('express').Router();
const homePage = require('../controllers/homePageController');
const paginateResults = require('../middlewares/paginateResults');

router.get('/', paginateResults, homePage);

module.exports = router;