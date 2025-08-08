// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../utils/supabase/supabase';

// returns the four latest news stored in the database
export async function GET(request: Request) {
  const { data, error } = await supabase
    .from('news')
    .select('*')

  if (error) {
    return new Response(JSON.stringify('ERROR'), {
      status: 999,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}