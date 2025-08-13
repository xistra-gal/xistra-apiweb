// app/api/news/route.ts
import supabase from '../../utils/supabase/supabase'
import corsHeaders from '../../utils/cors/corsHeaders'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const limit = limitParam ? parseInt(limitParam, 10) : undefined

    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error when fetching news', details: error.message }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      )
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Server is fucked up' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
}

// preflight CORS request (OPTIONS pa los amigos)
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}