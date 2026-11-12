"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setMessage("Link reset password tidak valid.");
      return;
    }
    
    if (password.length < 8) {
      setMessage("Password minimal 8 karakter.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });
      

      const result = await response.json();
      setMessage(result.message || "Permintaan selesai diproses.");

      if (response.ok) {
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-[#f5f7f2] px-4 py-6">
      <div className="
        w-full max-w-[1040px] lg:min-h-[450px]
        bg-white rounded-[12px] overflow-hidden
        shadow-[0_25px_60px_rgba(0,0,0,0.18)]
        grid lg:grid-cols-[42%_58%]
      ">

        {/* LEFT */}

        <div className="flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-[360px]">

            <div className="flex justify-center">
              <Image
                src="/image/logo2 - Edited2.png"
                alt="SINAR"
                width={100}
                height={100}
                priority
                className="object-contain"
              />
            </div>

            <h1 className="mt-6 text-center text-[20px] font-bold text-[#355827]">
              Reset Password
            </h1>

            <p className="mt-3 mb-8 text-center text-gray-500 leading-7 text-[12px]">
              Buat password baru untuk akun
              admin Website SINAR kamu.
            </p>

            <form onSubmit={handleSubmit}>

              {/* Password Baru */}

              <label className="block mb-2 font-semibold text-[#355827]">
                Password Baru
              </label>

              <div className="h-11 rounded-xl border-2 border-[#4D7B38] flex items-center px-4 focus-within:border-[#FFC928]">
                <Lock size={18} className="text-[#4D7B38]" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password baru"
                  autoComplete="new-password"
                  className="flex-1 ml-3 outline-none bg-transparent text-[#355827] placeholder:text-gray-400"
                />

                {showPassword ? (
                  <EyeOff
                    size={18}
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer text-[#4D7B38]"
                  />
                ) : (
                  <Eye
                    size={18}
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer text-[#4D7B38]"
                  />
                )}
              </div>

              {/* Konfirmasi Password */}

              <label className="block mt-4 mb-2 font-semibold text-[#355827]">
                Konfirmasi Password
              </label>

              <div className="h-11 rounded-xl border-2 border-[#4D7B38] flex items-center px-4 focus-within:border-[#FFC928]">
                <Lock size={18} className="text-[#4D7B38]" />

                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  autoComplete="new-password"
                  className="flex-1 ml-3 outline-none bg-transparent text-[#355827] placeholder:text-gray-400"
                />

                {showConfirm ? (
                  <EyeOff
                    size={18}
                    onClick={() => setShowConfirm(false)}
                    className="cursor-pointer text-[#4D7B38]"
                  />
                ) : (
                  <Eye
                    size={18}
                    onClick={() => setShowConfirm(true)}
                    className="cursor-pointer text-[#4D7B38]"
                  />
                )}
              </div>

              {message && (
                <p className="mt-3 text-center text-xs text-[#355827]">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 mt-5 rounded-xl bg-[#FFC928] hover:bg-yellow-400 text-[#29411C] font-bold text-[12px] disabled:opacity-60"
              >
                {loading ? "Memproses..." : "Simpan Password Baru"}
              </button>

            </form>

            <div className="flex justify-center mt-5">
              <Link
                href="/login"
                className="text-sm font-semibold text-[#4D7B38] hover:text-[#FFC928]"
              >
                Kembali ke Login
              </Link>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div className="relative hidden lg:block min-h-[450px] overflow-hidden">
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          <div className="absolute left-10 bottom-10 max-w-[320px]">
            <span className="inline-flex px-4 py-2 rounded-full bg-[#FFC928] text-[#29411C] font-bold text-sm">
              Website SINAR
            </span>

            <h2 className="mt-5 text-[34px] font-bold text-white leading-tight">
              Sistem Informasi
              <br />
              Ngaji &
              <br />
              Administrasi
            </h2>

            <p className="mt-5 text-white/90 leading-8 text-[12px]">
              Platform digital untuk mengelola
              administrasi, jadwal kegiatan,
              inventaris, laporan keuangan,
              pengurus, dan seluruh informasi
              masjid dalam satu sistem yang
              modern, cepat, dan transparan.
            </p>
          </div>
        </div>

        {/* MOBILE IMAGE */}

        <div className="relative h-[220px] lg:hidden">
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="text-3xl font-bold text-white">
              Website SINAR
            </h2>

            <p className="mt-2 text-sm leading-6 text-white/90">
              Sistem Informasi Ngaji &
              Administrasi Rumah Ibadah
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}