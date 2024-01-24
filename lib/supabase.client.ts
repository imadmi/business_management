"use client";

import { createBrowserClient } from "@supabase/ssr";
import { env } from "./env.client";


/**
 * In client components, import the `supabaseForClientComponent` variable and use it like this:
 * @example
 * const { data, error } = await supabase
 *   .from('users')
 *   .select();
 */
export const supabaseForClientComponent = createBrowserClient<any>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);