"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  console.log("Sending to:", to);
  console.log("Subject:", subject);

  try {
    const data = await resend.emails.send({
      to: "sridharani916@gmail.com",
       from: "Finance App <onboarding@resend.dev>",

      subject,
      react,
    });

    console.log("✅ Email Sent. Resend response:", data);
    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return { success: false, error };
  }
}
