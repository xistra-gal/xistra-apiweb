// app/api/news/route.ts
import supabase from '../../utils/supabase/supabase'
import corsHeaders from '../../utils/cors/corsHeaders'

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .limit(4)
      .order('created_at', { ascending: false })
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