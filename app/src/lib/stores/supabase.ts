import { createClient } from '@supabase/supabase-js'
import { writable } from 'svelte/store'
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_API_KEY } from '$env/static/public'

const defaultStore = {
	user: null,
	msgs: []
}

export const store = writable(defaultStore)

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_API_KEY)
