const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase() {
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Connected to the database!');
        })
        .catch((error) => {
            console.error('Error connecting to the database:', error.message);
        });
}

connectToDatabase();

// Define the schema for the data to be stored
const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    phone: Number,
    coffeeDate: Date
});

// Create a model for the data
const User = mongoose.model('User', userSchema);

module.exports = User;