const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashRoutes = require('./dashboardRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/', dashRoutes); 

module.exports = router;
