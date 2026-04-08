const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Standard client for most operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for operations that bypass RLS (like profile creation or admin tasks)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = { supabase, supabaseAdmin };
