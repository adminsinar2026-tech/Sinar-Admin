"use client";

import { useMemo, useState } from "react";
import {
  CircleDollarSign,
  FileText,
  Pencil,
  Search,
  Tag,
} from "lucide-react";

import { LaporanData } from "./types";

interface Props {
  data: LaporanData[];
  onSelect: (item: LaporanData) => void;
}

export default function LaporanTable({
  data,
  onSelect,
}: Props) {

  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {

    return data.filter((item) =>

      item.kategori
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.deskripsi
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.jenis
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [data, search]);

  return (

    <div className="space-y-4">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="relative w-full md:max-w-sm">

          <Search
            size={16}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
          />

          <input
            type="text"
            placeholder="Cari laporan..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              h-8
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              pl-11
              pr-4
              text-sm
              outline-none
              transition-all
              focus:bg-white
              focus:border-[#4D7B38]
              focus:ring-2
              focus:ring-green-100
            "
          />

        </div>

        <div className="flex items-center gap-2">

          <span className="text-sm text-gray-500">
            Total Data
          </span>

          <div
            className="
              bg-[#4D7B38]
              text-white
              px-3
              py-1
              rounded-full
              text-[12px]
              font-semibold
            "
          >
            {filteredData.length}
          </div>

        </div>

      </div>

      {/* Table */}

<div
  className="
    max-h-[330px]
    overflow-y-auto
    overflow-x-auto
    rounded-2xl
    border
    border-gray-100
    bg-white
    shadow-md
    text-[12px]
    print:max-h-none
    print:overflow-visible
    print:shadow-none
    print:border-0
  "
>

        <table className="w-full print:w-full">

          <thead className="sticky top-0 z-10 bg-[#4D7B38]">

            <tr className="text-white">

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Tanggal
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Jenis
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Kategori
              </th>

              <th className="px-5 py-4 text-left text-[13px] font-semibold">
                Deskripsi
              </th>

              <th className="px-5 py-4 text-right text-[13px] font-semibold">
                Jumlah
              </th>

              <th className="px-5 py-4 text-center text-[13px] font-semibold">
                Status
              </th>

<th className="px-5 py-4 text-center text-[13px] font-semibold print:hidden">
  Aksi
</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">

                        {filteredData.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="py-12 text-center"
                >

                  <FileText
                    size={30}
                    className="mx-auto text-gray-300 mb-4"
                  />

                  <h2 className="text-lg font-semibold text-gray-700">
                    Belum ada laporan keuangan
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Klik tombol Tambah Laporan untuk membuat data baru.
                  </p>

                </td>

              </tr>

            ) : (

              filteredData.map((item) => (

                <tr
                  key={item.id}
                  className="
                    hover:bg-green-50
                    transition-all
                    duration-200
                  "
                >

                  {/* Tanggal */}

                  <td className="px-5 py-4 text-[12px]">
                    {item.tanggal}
                  </td>

                  {/* Jenis */}

                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          item.jenis === "Pemasukan"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      <Tag size={12} className="mr-1" />
                      {item.jenis}
                    </span>

                  </td>

                  {/* Kategori */}

                  <td className="px-5 py-4 text-[12px] font-medium">
                    {item.kategori}
                  </td>

                  {/* Deskripsi */}

                  <td className="px-5 py-4 max-w-[250px] text-[12px]">
                    {item.deskripsi}
                  </td>

                  {/* Jumlah */}

                  <td className="px-5 py-4 text-right">

                    <div className="flex justify-end items-center gap-2">

                      <CircleDollarSign
                        size={15}
                        className="text-[#4D7B38]"
                      />

                      <span className="font-semibold text-[12px]">

                        Rp{" "}
                        {Number(item.jumlah).toLocaleString(
                          "id-ID"
                        )}

                      </span>

                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-5 py-4 text-center">

                    <span
                      className={`
                        inline-flex
                        items-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        ${
                          item.status === "Lunas"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {item.status}
                    </span>

                  </td>

                  {/* Aksi */}

                  <td className="px-5 py-4 text-center print:hidden">

                    <button
                      onClick={() => onSelect(item)}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        w-9
                        h-9
                        rounded-lg
                        bg-blue-50
                        hover:bg-blue-100
                        transition
                      "
                    >

                      <Pencil
                        size={16}
                        className="text-blue-600"
                      />

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

            {/* Footer */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4 gap-3">

        <p className="text-sm text-gray-500">

          Menampilkan

          <span className="mx-1 font-semibold text-[#4D7B38]">

            {filteredData.length}

          </span>

          laporan keuangan.

        </p>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <p className="text-xs text-gray-400">

            Klik ikon edit untuk mengubah data

          </p>

        </div>

      </div>

    </div>

  );

}