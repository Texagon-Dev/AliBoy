// supabase.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config(); // Load environment variables from .env file

const supabaseUrl = "https://yffowixkdslmvdhtzuzy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmZm93aXhrZHNsbXZkaHR6dXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NTI4MTMsImV4cCI6MjAyOTQyODgxM30.0WEuGEYuUXOk5ADZtcO6HJ4teGzSSvRNHktbw9icqGM";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
