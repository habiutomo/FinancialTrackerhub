# FinancialTracker

FinancialTracker adalah aplikasi berbasis web yang dirancang untuk membantu pengguna melacak keuangan mereka dengan visualisasi data yang interaktif dan antarmuka yang responsif.

## Fitur

- **Visualisasi Data**: Menggunakan komponen chart berbasis [Recharts](https://recharts.org/) untuk menampilkan data keuangan.
- **Tema Kustom**: Mendukung tema terang dan gelap dengan konfigurasi warna yang dapat disesuaikan.
- **Server-Side Rendering**: Menggunakan Vite untuk pengembangan dan rendering sisi server.
- **Integrasi Tailwind CSS**: Menggunakan Tailwind CSS untuk styling yang cepat dan konsisten.
- **API Logging**: Menyediakan logging untuk semua permintaan API.

## Struktur Proyek

```
.
├── attached_assets/       # Aset gambar yang digunakan dalam aplikasi
├── client/                # Kode frontend aplikasi
│   ├── src/               # Sumber kode React
│   └── index.html         # Entry point aplikasi
├── server/                # Kode backend aplikasi
├── shared/                # Kode yang dapat digunakan bersama antara client dan server
├── tailwind.config.ts     # Konfigurasi Tailwind CSS
├── vite.config.ts         # Konfigurasi Vite
└── package.json           # Dependensi proyek
```

## Instalasi

1. **Clone repository**:
   ```sh
   git clone https://github.com/username/FinancialTracker.git
   cd FinancialTracker
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Jalankan aplikasi**:
   ```sh
   npm run dev
   ```

4. **Build aplikasi untuk produksi**:
   ```sh
   npm run build
   ```

## Konfigurasi

### Tailwind CSS
Konfigurasi Tailwind CSS dapat ditemukan di file tailwind.config.ts. Anda dapat menyesuaikan warna dasar, variabel CSS, dan lainnya sesuai kebutuhan.

### Vite
Konfigurasi Vite dapat ditemukan di file vite.config.ts. File ini mengatur alias, plugin, dan direktori output untuk build.

## Penggunaan

### Komponen Chart
Komponen chart utama dapat ditemukan di client/src/components/ui/chart.tsx. Komponen ini mendukung konfigurasi tema dan warna melalui properti `config`.

Contoh penggunaan:
```tsx
import { ChartContainer } from "@/components/ui/chart";

const config = {
  income: { color: "#4caf50", label: "Income" },
  expense: { color: "#f44336", label: "Expense" },
};

<ChartContainer config={config}>
  {/* Chart content */}
</ChartContainer>;
```

### Server
Server menggunakan Express dan dapat dikonfigurasi melalui file server/vite.ts. Fungsi `setupVite` digunakan untuk mengatur middleware Vite, sedangkan `serveStatic` digunakan untuk melayani file statis.

## Skrip NPM

- `npm run dev`: Menjalankan aplikasi dalam mode pengembangan.
- `npm run build`: Membuat build untuk produksi.
- `npm run preview`: Menjalankan server untuk mempratinjau build produksi.

## Lisensi

habizinnia@gmail.com
