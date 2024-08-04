const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAdmin = (req, res, next) => {
    if (req.session.isAdmin) {
        next(); // User is authenticated, proceed to the next middleware/route handler
    } else {
        res.redirect('/admin/login'); // Redirect to login if not authenticated
    }
};

// Route definitions
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);

router.use(isAdmin); // Apply authentication middleware to all following routes

router.get('/dashboard', adminController.getDashboard);
router.get('/add-car', adminController.getAddCar);
router.post('/add-car', adminController.postAddCar);

router.param('carId', (req, res, next, carId) => {
    // Optionally validate carId here
    req.carId = carId;
    next();
});

router.get('/edit-car/:carId', adminController.getEditCar);
router.post('/edit-car', adminController.postEditCar);
router.post('/delete-car', adminController.postDeleteCar);

module.exports = router;
