// seedOwner.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user'); // Adjust the path if needed
const dotenv = require('dotenv');

dotenv.config();

const createOwnerAccount = async () => {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Database connected"))
        .catch((error) => console.log("Database connection error:", error));

    try {
        // Check if the owner account already exists
        const existingOwner = await User.findOne({ role: 'admin' });
        if (existingOwner) {
            console.log("Owner account already exists.");
            return;
        }

        // Hash the password "admin"
        const hashedPassword = await bcrypt.hash('admin', 10);

        // Create the owner account
        const owner = new User({
            email: 'owner@example.com',  // Replace with the desired owner email
            password: hashedPassword,
            role: 'admin'
        });

        // Save the owner account to the database
        await owner.save();
        console.log("Owner account created successfully.");
    } catch (error) {
        console.log("Error creating owner account:", error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
};

// Execute the function to create the owner account
createOwnerAccount();
