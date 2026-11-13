import { NextResponse } from "next/server";
import { randomBytes, createHash } from "crypto";
import nodemailer from "nodemailer";
import { adminSupabase } from "../../lib/adminSupabase";

export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username || "").trim();

    if (!username) {
      return NextResponse.json(
        { message: "Username wajib diisi." },
        { status: 400 }
      );
    }

    const { data: user, error } = await adminSupabase
      .from("User")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      throw error;
    }

    // Pesan tetap sama agar keberadaan username tidak bocor.
    const responseMessage =
      "Jika akun ditemukan, link reset akan dikirim ke email admin.";

    if (!user) {
      return NextResponse.json({ message: responseMessage });
    }

    const token = randomBytes(32).toString("hex");

    const tokenHash = createHash("sha256")
      .update(token)
      .digest("hex");

    const expiresAt = new Date(
      Date.now() + 30 * 60 * 1000
    ).toISOString();

    const { error: insertError } = await adminSupabase
      .from("password_reset_tokens")
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      });

    if (insertError) {
      throw insertError;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS?.replace(/\s/g, ""),
      },
    });

    const origin = new URL(request.url).origin;
    const resetLink =
      `${origin}/reset-password?token=${token}`;


const info = await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: "admin.sinar2026@gmail.com",
  subject: "Reset Password Website SINAR",
  text: `Klik link berikut untuk membuat password baru:\n\n${resetLink}\n\nLink berlaku selama 30 menit.`,
  html: `
    <h2>Reset Password SINAR</h2>
    <p>Klik tombol berikut untuk membuat password baru.</p>
    <a href="${resetLink}">Reset Password</a>
    <p>Link berlaku selama 30 menit.</p>
    <p>Jika kamu tidak meminta reset password, abaikan email ini.</p>
  `,
});

console.log("RESET EMAIL SENT:", info.messageId);
console.log("RESET EMAIL RESPONSE:", info.response);

    return NextResponse.json({ message: responseMessage });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Gagal mengirim email reset password." },
      { status: 500 }
    );
  }
}
