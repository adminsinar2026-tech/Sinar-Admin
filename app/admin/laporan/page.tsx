"use client";

import { useEffect, useState } from "react";
import { Plus, Printer, FileSpreadsheet } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import LaporanTable from "./LaporanTable";
import LaporanPopup from "./LaporanPopup";

import { supabase } from "../../lib/supabase";
import { LaporanData } from "./types";

export default function LaporanPage() {
  const emptyForm: LaporanData = {
    id: 0,
    tanggal: "",
    jenis: "",
    kategori: "",
    deskripsi: "",
    jumlah: 0,
    status: "",
  };

  const [form, setForm] = useState<LaporanData>(emptyForm);
  const [data, setData] = useState<LaporanData[]>([]);
  const [openPopup, setOpenPopup] = useState(false);

  // Penanda mode Edit / Tambah
  const [selectedData, setSelectedData] =
    useState<LaporanData | null>(null);

  useEffect(() => {
    getData();
  }, []);

  function handlePrint() {
  window.print();
}

  async function getData() {
    const { data, error } = await supabase
      .from("laporan")
      .select("*")
      .order("id");

    if (error) {
      alert(error.message);
      return;
    }

    setData(data ?? []);

    const nextId =
      data && data.length
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);
  }

  function resetForm(id: number) {
    setForm({
      id,
      tanggal: "",
      jenis: "",
      kategori: "",
      deskripsi: "",
      jumlah: 0,
      status: "",
    });
  }

  function handleExportExcel() {
  if (data.length === 0) {
    alert("Belum ada data laporan untuk diekspor.");
    return;
  }

  const headers = [
    "ID",
    "Tanggal",
    "Jenis",
    "Kategori",
    "Deskripsi",
    "Jumlah",
    "Status",
  ];

  const rows = data.map((item) => [
    item.id,
    item.tanggal,
    item.jenis,
    item.kategori,
    item.deskripsi,
    item.jumlah,
    item.status,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) =>
          `"${String(value ?? "").replace(/"/g, '""')}"`
        )
        .join(";")
    )
    .join("\r\n");

  const blob = new Blob(
    ["\uFEFF" + csvContent],
    { type: "text/csv;charset=utf-8;" }
  );

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Laporan-Keuangan-SINAR.csv";
  link.click();

  URL.revokeObjectURL(url);
}

  // ================= TAMBAH =================

  function handleTambah() {
    setSelectedData(null);

    const nextId =
      data.length > 0
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);

    setOpenPopup(true);
  }

  // ================= EDIT =================

  function handleEdit(item: LaporanData) {
    setSelectedData(item);

    setForm(item);

    setOpenPopup(true);
  }

  // ================= CLOSE =================

  function handleClose() {
    setSelectedData(null);

    const nextId =
      data.length > 0
        ? data[data.length - 1].id + 1
        : 1;

    resetForm(nextId);

    setOpenPopup(false);
  }

    // ================= SIMPAN =================

  async function simpanData() {
    if (
      !form.tanggal ||
      !form.jenis ||
      !form.kategori ||
      !form.deskripsi ||
      form.jumlah <= 0 ||
      !form.status
    ) {
      alert("Lengkapi semua data.");
      return;
    }

    const { error } = await supabase
      .from("laporan")
      .insert([
        {
          tanggal: form.tanggal,
          jenis: form.jenis,
          kategori: form.kategori,
          deskripsi: form.deskripsi,
          jumlah: form.jumlah,
          status: form.status,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();
  }

  // ================= UPDATE =================

  async function updateData() {
    if (!selectedData) {
      alert("Pilih data yang akan diupdate.");
      return;
    }

    const { error } = await supabase
      .from("laporan")
      .update({
        tanggal: form.tanggal,
        jenis: form.jenis,
        kategori: form.kategori,
        deskripsi: form.deskripsi,
        jumlah: form.jumlah,
        status: form.status,
      })
      .eq("id", selectedData.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();
  }

  // ================= HAPUS =================

  async function hapusData() {
    if (!selectedData) {
      alert("Pilih data yang akan dihapus.");
      return;
    }

    const konfirmasi = confirm(
      "Yakin ingin menghapus data ini?"
    );

    if (!konfirmasi) return;

    const { error } = await supabase
      .from("laporan")
      .delete()
      .eq("id", selectedData.id);

    if (error) {
      alert(error.message);
      return;
    }

    await getData();

    handleClose();
  }

    return (
    <main className="min-h-screen bg-[#16240D] text-white flex flex-col">

      <Navbar />

      <section
        className="
          flex-1
          w-full
          max-w-6xl
          mx-auto
          px-4
          md:px-7
          py-4
          pb-18
        "
      >

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">

          <div>

            <h1 className="text-[38px] font-bold text-white">
              Laporan Keuangan
            </h1>

          </div>

          <button
            onClick={handleTambah}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-[#4D7B38]
              hover:bg-[#3F662E]
              text-white
              font-semibold
              px-3
              py-3
              text-[14px]
              rounded-2xl
              shadow-lg
              transition-all
              duration-300
              hover:scale-105
              w-full
              lg:w-auto
            "
          >
            <Plus size={20} />
            Tambah Laporan
          </button>

        </div>

        {/* Card */}

        <div className="bg-white text-gray-900 rounded-3xl shadow-xl p-5 md:p-6">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">

  <h2 className="text-[30px] font-bold text-gray-800">
    Daftar Laporan Keuangan
  </h2>

  <div className="flex flex-wrap gap-3 print:hidden">

    <button
      onClick={handlePrint}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold"
    >
      <Printer size={18} />
      Print / PDF
    </button>

    <button
      onClick={handleExportExcel}
      className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-3 rounded-xl font-semibold"
    >
      <FileSpreadsheet size={18} />
      Export Excel
    </button>

  </div>

</div>

          <LaporanTable
            data={data}
            onSelect={handleEdit}
          />

        </div>

        {/* Popup */}

        <LaporanPopup
          open={openPopup}
          selected={selectedData}
          form={form}
          setForm={setForm}
          onClose={handleClose}
          onSave={simpanData}
          onEdit={() => {}}
          onUpdate={updateData}
          onDelete={hapusData}
        />

      </section>

      <Footer />

    </main>
  );
}