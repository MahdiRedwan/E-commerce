import { createClient } from '@supabase/supabase-js'

// Hardcoded for deployment
const supabaseUrl = 'https://xmvzvtvqqizznofxhzlp.supabase.co'
const supabaseAnonKey = 'sb_publishable_pXg2SUpdqmTpZzIH-68uZw_-1l-B4OC'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)