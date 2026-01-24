import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if we're in a build environment (where env vars might not be available)
const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

// Create client with validation
let supabaseClient: ReturnType<typeof createClient>

if (supabaseUrl && supabaseAnonKey && 
    supabaseUrl !== 'https://placeholder.supabase.co' && 
    supabaseAnonKey !== 'placeholder-key') {
  // Valid configuration - create real client
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    },
  })
} else if (isBuildTime) {
  // Build time - create placeholder to prevent build errors
  supabaseClient = createClient(
    'https://placeholder.supabase.co',
    'placeholder-key'
  )
} else {
  // Runtime without config - this will fail but with a clear error
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel project settings.'
  )
}

export const supabase = supabaseClient
