// server.js

const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const UserProfile = require('./models/userProfile');
const User = require('./models/user');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(express.json()); // Parse JSON bodies

// Route for user signup
app.post('/api/signup', async (req, res) => {
    try {
        const { email, fullname, dob, password } = req.body;

        // Insert data into user_profiles table
        const userProfile = new UserProfile(email, fullname, dob);
        const { data: userProfileData, error: userProfileError } = await supabase
            .from('user_profiles')
            .insert([userProfile.toJSON()]);
        if (userProfileError) {
            throw new Error(userProfileError.message);
        }

        // Insert email and password into users table
        const user = new User(email, password);
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([user.toJSON()]);
        if (userError) {
            throw new Error(userError.message);
        }

        res.status(201).json({ message: 'User created successfully', userProfileData, userData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
