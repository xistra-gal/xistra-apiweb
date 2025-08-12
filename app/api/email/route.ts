import addUserToNewsLetter from "../../utils/resend/resend";
import corsHeaders from "../../utils/cors/corsHeaders";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body; // extract email field
        const result = await addUserToNewsLetter(email);

        return new Response(
            JSON.stringify({ success: true, data: result }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            }
        );

    } catch (error) {
        return new Response(
            JSON.stringify({ success: false, error: String(error) }),
            { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders }, }
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