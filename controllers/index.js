const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoute = require('./htmlRoutes');

router.use('/', htmlRoute);
router.use('/api', apiRoutes);

module.exports = router;