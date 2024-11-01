import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Store feedback in your database here
    
    // Send email notification
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL || "admin@example.com",
      subject: "New Toilet Feedback Received",
      html: `
        <h1>New Feedback Received</h1>
        <p>Details:</p>
        <ul>
          ${Object.entries(body)
            .map(([key, value]) => `<li>${key}: ${value}</li>`)
            .join("")}
        </ul>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process feedback" },
      { status: 500 }
    );
  }
}