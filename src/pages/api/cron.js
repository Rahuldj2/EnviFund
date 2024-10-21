// pages/api/cron.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  // Check for authorization header
  const authHeader = req.headers['authorization'];

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    // Run a lightweight query to keep the database alive
    const { error } = await supabase.rpc('pg_sleep', [1]); // You can replace this with another simple query if preferred
    if (error) {
      throw new Error('Error running keep-alive query:', error.message);
    }

    res.status(200).end('Supabase keep-alive query successful');
  } catch (err) {
    res.status(500).end(`Error: ${err.message}`);
  }
}
