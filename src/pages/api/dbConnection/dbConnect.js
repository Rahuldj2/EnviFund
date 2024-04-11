// db.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvqaptgoblyycfsjzfly.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cWFwdGdvYmx5eWNmc2p6Zmx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MDk3MDAsImV4cCI6MjAyNzk4NTcwMH0.8cZrvJ1QNvCrWiCd46-hlzN6vhGNUKZ1g6FLQSZqdtw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
