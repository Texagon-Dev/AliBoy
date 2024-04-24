import { createClient } from '@supabase/supabase-js'

console.log(import.meta.env.VITE_SUPABASE_URL);

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON)

export default supabase