const router = require('express').Router();
const friendsRoutes = require('./friendsRoutes');
const usersRoutes = require('./usersRoutes');
const reactionsRoutes = require('./reactionsRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/friends', friendsRoutes);
router.use('/users', usersRoutes);
router.use('/reactions', reactionsRoutes);
router.use('/thoughts', thoughtsRoutes);

module.exports = router;