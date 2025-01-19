const express = require('express');

const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { registerController, loginController, testController, forgotPasswordController, updateProfileController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/test', requireSignIn, isAdmin, testController)


router.post('forgot-password', forgotPasswordController)
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

router.put('/profile', requireSignIn, updateProfileController)
module.exports = router;