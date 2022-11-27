const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const animalRoutes = require('./projectRoutes');

router.use('/user', userRoutes);
router.use('/project', projectRoutes);

module.exports = router;