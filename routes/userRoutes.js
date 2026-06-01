const router = require('express').Router();
const {createUser,loginUser,getAllUsers,getUser,updateUser,deleteUser} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware')

// signin /signup routes
router.post('/login',loginUser);
router.post('/register',createUser);

//crud routes
router.get('/users',getAllUsers);
router.get('/user',authMiddleware,getUser);
router.put('/user',authMiddleware,updateUser);
router.delete('/user',authMiddleware,deleteUser);

module.exports = router;