const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Middleware to check if the user is authenticated
const isUser = (req, res, next) => {
    if (req.session.isUser) {
        next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
        res.redirect('/user/login'); // Redirect to login if not authenticated
    }
};

// Route definitions
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.use(isUser); // Apply authentication middleware to all following routes

router.get('/cars', userController.getCars);

module.exports = router;
