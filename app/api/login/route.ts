
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminSupabase } from "../../lib/adminSupabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const username = String(body.username || "").trim();
    const password = String(body.password || "");

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const { data: user, error } = await adminSupabase
      .from("User")
      .select("id, password")
      .eq("username", username)
      .maybeSingle();

    if (error) throw error;

    if (!user) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 }
      );
    }

    const storedPassword = String(user.password);
    const isHashed = /^\$2[aby]\$/.test(storedPassword);

    let isValid = false;

    if (isHashed) {
      isValid = await bcrypt.compare(password, storedPassword);
    } else {
      isValid = password === storedPassword;

      if (isValid) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { error: updateError } = await adminSupabase
          .from("User")
          .update({ password: hashedPassword })
          .eq("id", user.id);

        if (updateError) throw updateError;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login API error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan saat login." },
      { status: 500 }
    );
  }
}
