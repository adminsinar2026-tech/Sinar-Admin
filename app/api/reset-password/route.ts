
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { adminSupabase } from "../../lib/adminSupabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const token = String(body.token || "");
    const password = String(body.password || "");

    if (!token || !password) {
      return NextResponse.json(
        { message: "Data reset password tidak lengkap." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password minimal 8 karakter." },
        { status: 400 }
      );
    }

    const tokenHash = createHash("sha256")
      .update(token)
      .digest("hex");

    const { data: resetToken, error } = await adminSupabase
      .from("password_reset_tokens")
      .select("id, user_id")
      .eq("token_hash", tokenHash)
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (error) throw error;

    if (!resetToken) {
      return NextResponse.json(
        { message: "Link reset tidak valid atau sudah kedaluwarsa." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: updatedUser, error: updateError } =
      await adminSupabase
        .from("User")
        .update({ password: hashedPassword })
        .eq("id", resetToken.user_id)
        .select("id")
        .maybeSingle();

    if (updateError) throw updateError;

    if (!updatedUser) {
      return NextResponse.json(
        { message: "Akun admin tidak ditemukan." },
        { status: 404 }
      );
    }

    const { data: usedToken, error: usedError } =
      await adminSupabase
        .from("password_reset_tokens")
        .update({ used_at: new Date().toISOString() })
        .eq("id", resetToken.id)
        .is("used_at", null)
        .select("id")
        .maybeSingle();

    if (usedError) throw usedError;

    if (!usedToken) {
      return NextResponse.json(
        { message: "Link reset sudah digunakan." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Password berhasil diubah. Silakan login kembali.",
    });

  } catch (error) {
    console.error("Reset password API error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan saat mengubah password." },
      { status: 500 }
    );
  }
}
