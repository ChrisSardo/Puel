import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client function that handles missing env vars gracefully
function getSupabaseClient() {
  // During build time, if env vars are missing, create a placeholder client
  // This prevents build errors. At runtime, the actual env vars will be used.
  const url = supabaseUrl || 'https://placeholder.supabase.co'
  const key = supabaseAnonKey || 'placeholder-key'
  
  return createClient(url, key)
}

export const supabase = getSupabaseClient()
