import { Resend } from 'resend';
import supabase from '../supabase/supabase';
import corsHeaders from '../cors/corsHeaders';

const RESEND_API_KEY = process.env.PRIVATE_RESEND_API_KEY;

export default async function addUserToNewsLetter(email: string) {
    const resend = new Resend(RESEND_API_KEY);

    try {
        // add to the db
        const { data, error } = await supabase
            .from("newsletter_members")
            .insert({ email: email })


        if (error) {
            throw new Error("Error when inserting the email in the db");
        }
        // send an email to notice the user
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev', // change this when i have the domain account
            to: email,
            subject: 'Xistra Newsletter - ¡Bienvenido!',
            html: `
            <h2>¡Gracias por suscribirte!</h2>
            <p>Ahora estarás al tanto de todas nuestras novedades sobre <strong>Xistra</strong>, sus noticias, investigaciones y acuerdos. ¡Serás el primero en enterarte!</p>
            <p>Muchas gracias por suscribirte,</p>
            <p>El equipo de <strong>Xistra</strong></>`
        });

        return response;
    } catch (error) {
        throw new Error("Unexpected error when sending the email!");
    }
};
