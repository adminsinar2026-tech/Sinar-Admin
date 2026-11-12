"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { supabase } from "../lib/supabase";

export default function LoginCard() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    if (!username.trim() || !password.trim()) {
      alert("Username dan Password wajib diisi.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    setLoading(false);

    if (error || !data) {
      alert("Username atau Password salah.");
      return;
    }

    localStorage.setItem("isLogin", "true");

    router.push("/home");
  }

  return (
    <section
      className="
        w-full
        flex
        justify-center
        items-center
        

      "
    >
      <div
        className="
          w-full
          max-w-[1040px]
          lg:min-h-[450px]
          bg-white
          rounded-[12px]
          overflow-hidden
          shadow-[0_25px_60px_rgba(0,0,0,0.18)]
          grid
          lg:grid-cols-[42%_58%]
        "
      >

                {/* ================= LEFT ================= */}

        <div
          className="
            flex
            items-center
            justify-center
            px-4
            py-4
          "
        >
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

            {/* Judul */}

            <h1
              className="
                mt-6
                text-center
                text-[20px]
                font-bold
                text-[#355827]
                leading-tight
              "
            >
              Selamat Datang
            </h1>

            <p
              className="
                mt-3
                mb-8
                text-center
                text-gray-500
                leading-7
                text-[12px]
              "
            >
              Login untuk masuk ke Dashboard
              Admin Website SINAR.
            </p>

            {/* Username */}

            <label
              className="
                block
                mb-2
                font-semibold
                text-[#355827]
              "
            >
              Username
            </label>

            <div
              className="
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
              "
            >
              <Mail
                size={18}
                className="text-[#4D7B38]"
              />

<input
  autoComplete="username"
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder="Masukkan Username"
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

            {/* Password */}

            <label
              className="
                block
                mt-4
                mb-2
                font-semibold
                text-[#355827]
              "
            >
              Password
            </label>

            <div
              className="
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
              "
            >
              <Lock
                size={18}
                className="text-[#4D7B38]"
              />

<input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Masukkan Password"
  className="
    flex-1
    ml-3
    outline-none
    bg-transparent
    text-[#355827]
    placeholder:text-gray-400
  "
/>

              {showPassword ? (
                <EyeOff
                  size={18}
                  onClick={() =>
                    setShowPassword(false)
                  }
                  className="
                    cursor-pointer
                    text-[#4D7B38]
                  "
                />
              ) : (
                <Eye
                  size={18}
                  onClick={() =>
                    setShowPassword(true)
                  }
                  className="
                    cursor-pointer
                    text-[#4D7B38]
                  "
                />
              )}
            </div>

            {/* Button */}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="
                w-full
                h-11
                mt-8
                rounded-xl
                bg-[#FFC928]
                hover:bg-yellow-400
                transition-all
                text-[#29411C]
                font-bold
                text-lg
                disabled:opacity-60
                text-[12px]
              "
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

          </div>
        </div>

                {/* ================= RIGHT ================= */}

        <div
          className="
            relative
            hidden
            lg:block
            h-full
            overflow-hidden
          "
        >
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/50
              via-black/10
              to-transparent
            "
          />

          {/* Info */}

          <div
            className="
              absolute
              left-10
              bottom-10
              max-w-[320px]
            "
          >
            <span
              className="
                inline-flex
                items-center
                px-4
                py-2
                rounded-full
                bg-[#FFC928]
                text-[#29411C]
                font-bold
                text-sm
              "
            >
              Website SINAR
            </span>

            <h2
              className="
                mt-5
                text-[34px]
                font-bold
                text-white
                leading-tight
              "
            >
              Sistem Informasi
              <br />
              Ngaji &
              <br />
              Administrasi
            </h2>

            <p
              className="
                mt-5
                text-white/90
                leading-8
                text-[12px]
              "
            >
              Platform digital untuk
              mengelola administrasi,
              jadwal kegiatan,
              inventaris,
              laporan keuangan,
              pengurus,
              dan seluruh informasi
              masjid dalam satu sistem
              yang modern, cepat,
              dan transparan.
            </p>
          </div>

        </div>

                {/* ================= MOBILE IMAGE ================= */}

        <div
          className="
            relative
            h-[220px]
            lg:hidden
          "
        >
          <Image
            src="/image/gedung1.jpeg"
            alt="Gedung SINAR"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              Website SINAR
            </h2>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-white/90
              "
            >
              Sistem Informasi
              Ngaji &
              Administrasi
              Rumah Ibadah
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
