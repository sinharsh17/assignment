const Car = require('../models/Car');

// Render login page
exports.getLogin = (req, res) => {
    res.render('admin/login', { title: 'Admin Login', error: req.flash('error') });
};

// Handle login logic
exports.postLogin = (req, res) => {
    if (req.body.username === 'admin' && req.body.password === 'password') {
        req.session.isAdmin = true;
        res.redirect('/admin/dashboard');
    } else {
        req.flash('error', 'Invalid username or password');
        res.redirect('/admin/login');
    }
};

// Render dashboard
exports.getDashboard = async (req, res) => {
    if (!req.session.isAdmin) return res.redirect('/admin/login');
    
    try {
        const cars = await Car.find();
        res.render('admin/dashboard', { cars, title: 'Dashboard', error: req.flash('error') });
    } catch (error) {
        console.error('Error fetching cars:', error.message);
        req.flash('error', 'Error fetching cars');
        res.redirect('/admin/dashboard'); // or show an error page
    }
};

// Render add car page
exports.getAddCar = (req, res) => {
    if (!req.session.isAdmin) return res.redirect('/admin/login');
    res.render('admin/add-car', { title: 'Add Car', error: req.flash('error') });
};

// Handle add car
exports.postAddCar = async (req, res) => {
    try {
        const car = new Car({
            name: req.body.name,
            manufacturingYear: req.body.manufacturingYear,
            price: req.body.price
        });
        await car.save();
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error adding car:', error.message);
        req.flash('error', 'Error adding car');
        res.redirect('/admin/add-car'); // or show an error page
    }
};

// Render edit car page
exports.getEditCar = async (req, res) => {
    if (!req.session.isAdmin) return res.redirect('/admin/login');
    
    try {
        const car = await Car.findById(req.params.carId);
        if (!car) {
            req.flash('error', 'Car not found');
            return res.redirect('/admin/dashboard');
        }
        res.render('admin/edit-car', { car, title: 'Edit Car', error: req.flash('error') });
    } catch (error) {
        console.error('Error fetching car:', error.message);
        req.flash('error', 'Error fetching car');
        res.redirect('/admin/dashboard'); // or show an error page
    }
};

// Handle edit car
exports.postEditCar = async (req, res) => {
    try {
        await Car.findByIdAndUpdate(req.body.carId, {
            name: req.body.name,
            manufacturingYear: req.body.manufacturingYear,
            price: req.body.price
        });
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error updating car:', error.message);
        req.flash('error', 'Error updating car');
        res.redirect('/admin/dashboard'); // or show an error page
    }
};

// Handle delete car
exports.postDeleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.body.carId);
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error deleting car:', error.message);
        req.flash('error', 'Error deleting car');
        res.redirect('/admin/dashboard'); // or show an error page
    }
};
