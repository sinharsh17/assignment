const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ensure the name field is always provided
        trim: true // Remove any extra whitespace from the name
    },
    manufacturingYear: {
        type: Number,
        required: true, // Ensure manufacturing year is always provided
        min: [1900, 'Year must be greater than or equal to 1900'], // Example of custom validation
        max: [new Date().getFullYear(), 'Year cannot be in the future'] // Example of custom validation
    },
    price: {
        type: Number,
        required: true, // Ensure price is always provided
        min: [0, 'Price must be a positive number'] // Ensure the price is non-negative
    }
});

// Optional: Create an index on the name field for faster searching
carSchema.index({ name: 1 });

module.exports = mongoose.model('Car', carSchema);
