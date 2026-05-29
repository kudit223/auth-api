const router = require('express').Router();
const {createUser,loginUser,getAllUsers} = require('../controllers/userController');
const {authHash} = require('../middlewares/authMiddleware')

// signin /signup routes
router.post('/login',loginUser);
router.post('/register',authHash,createUser);

//crud routes
router.get('/users',getAllUsers);

module.exports = router;