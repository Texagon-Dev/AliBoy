const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 function
const supabase = require('../utilities/supabase');
const User = require('../models/user');

async function signup(req, res) {
  const { fullName, dob, email, password } = req.body;

  try {
    // Check if user already exists
    const { data: existingUser, error: userError } = await supabase
      .from('Users')
      .select('user_id')
      .eq('users_email', email);

    if (userError) throw userError;

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of hashing

    // Generate random user_id
    const userId = uuidv4();

    // Insert data into users_profile table
    const { data: userProfile, error: profileError } = await supabase
      .from('Users_Profile')
      .insert([{ user_id: userId, full_name: fullName, dob }]);

    if (profileError) throw profileError;

    // Insert data into users table with encrypted password
    const { data: user, error } = await supabase
      .from('Users')
      .insert([{ user_id: userId, users_email: email, users_password: hashedPassword }]);

    if (error) throw error;

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup };
