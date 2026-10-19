const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mqytcatdlecuuoitlxud.supabase.co';
const supabaseAnonKey = 'sb_publishable_21-TIrUEmBc7k24n87O2Rg_E4nGKAjO';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('case_studies').select('id, slug, client, title');
  if (error) {
    console.error('Supabase query error:', error);
  } else {
    console.log('Current rows in Supabase:', data);
  }
}

check();
