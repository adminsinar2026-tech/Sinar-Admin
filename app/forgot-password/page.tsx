
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim()) {
      setMessage("Username wajib diisi.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const result = await response.json();
      setMessage(result.message || "Permintaan selesai diproses.");
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-[#f5f7f2] px-4 py-6">
      <div className="
        w-full
        max-w-[1040px]
        lg:min-h-[450px]
        bg-white
        rounded-[12px]
        overflow-hidden
        shadow-[0_25px_60px_rgba(0,0,0,0.18)]
        grid
        lg:grid-cols-[42%_58%]
      ">

        {/* LEFT */}

        <div className="flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-[360px]">

            {/* Logo */}

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

            {/* Title */}

            <h1 className="
              mt-6
              text-center
              text-[20px]
              font-bold
              text-[#355827]
              leading-tight
            ">
              Lupa Password?
            </h1>

            <p className="
              mt-3
              mb-8
              text-center
              text-gray-500
              leading-7
              text-[12px]
            ">
              Masukkan username akun admin kamu.
              Link reset password akan dikirim ke
              email admin Website SINAR.
            </p>

            {/* Username */}

            <form onSubmit={handleSubmit}>
              <label className="
                block
                mb-2
                font-semibold
                text-[#355827]
              ">
                Username
              </label>

              <div className="
                h-11
                rounded-xl
                border-2
                border-[#4D7B38]
                bg-white
                flex
                items-center
                px-4
                transition-all
                focus-within:border-[#FFC928]
              ">
                <Mail
                  size={18}
                  className="text-[#4D7B38]"
                />

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan Username"
                  autoComplete="username"
                  className="
                    flex-1
                    ml-3
                    outline-none
                    bg-transparent
                    text-[#355827]
                    placeholder:text-gray-400
                  "
                />
              </div>

              {/* Message */}

              {message && (
                <p className="mt-3 text-center text-xs text-[#355827]">
                  {message}
                </p>
              )}

              {/* Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-11
                  mt-5
                  rounded-xl
                  bg-[#FFC928]
                  hover:bg-yellow-400
                  transition-all
                  text-[#29411C]
                  font-bold
                  text-[12px]
                  disabled:opacity-60
                "
              >
                {loading ? "Mengirim..." : "Kirim Link Reset"}
              </button>
            </form>

            {/* Back to Login */}

            <div className="flex justify-center mt-5">
              <Link
                href="/login"
                className="
                  text-sm
                  font-semibold
                  text-[#4D7B38]
                  hover:text-[#FFC928]
                  transition-colors
                "
              >
                Kembali ke Login
              </Link>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}

        <div className="
          relative
          hidden
          lg:block
          h-full
          min-h-[450px]
          overflow-hidden
        ">
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          <div className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
          " />

          <div className="
            absolute
            left-10
            bottom-10
            max-w-[320px]
          ">
            <span className="
              inline-flex
              items-center
              px-4
              py-2
              rounded-full
              bg-[#FFC928]
              text-[#29411C]
              font-bold
              text-sm
            ">
              Website SINAR
            </span>

            <h2 className="
              mt-5
              text-[34px]
              font-bold
              text-white
              leading-tight
            ">
              Sistem Informasi
              <br />
              Ngaji &
              <br />
              Administrasi
            </h2>

            <p className="
              mt-5
              text-white/90
              leading-8
              text-[12px]
            ">
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

        <div className="
          relative
          h-[220px]
          lg:hidden
        ">
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="
            absolute
            bottom-5
            left-5
            right-5
          ">
            <h2 className="
              text-3xl
              font-bold
              text-white
            ">
              Website SINAR
            </h2>

            <p className="
              mt-2
              text-sm
              leading-6
              text-white/90
            ">
              Sistem Informasi Ngaji &
              Administrasi Rumah Ibadah
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
