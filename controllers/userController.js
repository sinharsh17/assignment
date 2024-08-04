const Car = require('../models/Car');

// Render login page
exports.getLogin = (req, res) => {
    res.render('user/login', { title: 'User Login', error: req.flash('error') });
};

// Handle login logic
exports.postLogin = (req, res) => {
    if (req.body.username === 'user' && req.body.password === 'password') {
        req.session.isUser = true;
        res.redirect('/user/cars');
    } else {
        res.redirect('/user/login');
    }
};

// Render list of cars
exports.getCars = async (req, res) => {
    if (!req.session.isUser) return res.redirect('/user/login');
    
    try {
        const cars = await Car.find();
        res.render('user/cars', { cars, title: 'Car List' });
    } catch (error) {
        console.error('Error fetching cars:', error.message);
        res.redirect('/user/cars'); // or show an error page
    }
};
