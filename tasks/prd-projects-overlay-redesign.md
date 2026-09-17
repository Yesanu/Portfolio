# PRD: Projects Overlay — 2-Column Desktop Redesign

## Introduction

Redesain ulang overlay detail project pada ProjectsSection dari layout vertikal (gambar di atas, konten di bawah) menjadi layout 2 kolom horizontal di desktop: panel kiri untuk gambar, panel kanan untuk detail informasi. Tujuannya agar gambar tidak terlihat terlalu besar/zoom dan konten lebih leluasa dalam tata letak. Mobile tetap menggunakan layout stack vertikal (gambar di atas, detail di bawah).

## Goals

- Tampilkan gambar dan detail project berdampingan di desktop (≥768px)
- Gambar tampil utuh tanpa clipping menggunakan `object-contain`
- Panel kanan memiliki ruang cukup untuk semua informasi detail
- Mobile tetap stack vertikal (gambar atas, detail bawah)
- Hanya tombol close (X) yang menutup overlay

## User Stories

### US-001: Overlay 2 kolom di desktop
**Description:** Sebagai pengunjung, saya ingin melihat gambar project di sebelah kiri dan detail informasi di sebelah kanan agar tampilan lebih seimbang dan tidak terlalu tinggi.

**Acceptance Criteria:**
- [ ] Di layar ≥768px (md breakpoint), overlay menggunakan 2 kolom (`grid grid-cols-2`)
- [ ] Kolom kiri menampilkan gambar project dengan `object-contain` (gambar utuh, tidak terpotong)
- [ ] Kolom kanan berisi detail: tahun, judul, role, deskripsi, tech stack tags, tombol aksi
- [ ] Gambar di kolom kiri memiliki tinggi proporsional (mis. `h-full` atau tinggi tetap wajar)
- [ ] Konten di kolom kanan dapat di-scroll jika terlalu panjang (`overflow-y-auto`)
- [ ] Di mobile (<768px): overlay kembali ke 1 kolom, gambar di atas, detail di bawah
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

### US-002: Urutan konten panel kanan
**Description:** Sebagai pengunjung, saya ingin detail project ditampilkan secara berurutan yang logis di panel kanan.

**Acceptance Criteria:**
- [ ] Urutan elemen panel kanan:
  1. Tahun (badge kecil, text-muted, uppercase)
  2. Judul project (heading besar, font-display bold)
  3. Role (text accent, uppercase, tracking-wide)
  4. Full description (paragraph text-muted)
  5. Tech stack tags (flex-wrap badges)
  6. Tombol aksi (View on GitHub + Back) di bagian bawah, align kiri
- [ ] Setiap elemen memiliki spacing yang konsisten
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

### US-003: Tombol aksi di kiri panel kanan
**Description:** Sebagai pengunjung, saya ingin tombol "View on GitHub" dan "Back" tersusun horizontal di bagian bawah panel kanan (align kiri).

**Acceptance Criteria:**
- [ ] Tombol View on GitHub dan Back tampil bersebelahan (horizontal flex)
- [ ] Posisi tombol di kiri (align-start) panel kanan
- [ ] Tombol View on GitHub: style primary (bg-text, text-bg)
- [ ] Tombol Back: style secondary (border border-border)
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

### US-004: Tutup overlay hanya via tombol X
**Description:** Sebagai pengunjung, saya ingin menutup overlay hanya dengan menekan tombol close (X), bukan dengan klik area gelap di luar atau menekan Escape.

**Acceptance Criteria:**
- [ ] Menghapus event listener `keydown` untuk Escape key
- [ ] Menghapus `onClick={handleClose}` pada overlay backdrop
- [ ] Hanya tombol close (X) di pojok kanan atas panel kanan yang bisa menutup overlay
- [ ] Overlay tetap menggunakan `AnimatePresence` untuk animasi exit
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

### US-005: Gambar tidak terclip
**Description:** Sebagai pengunjung, saya ingin gambar project tampil utuh tanpa terpotong di overlay.

**Acceptance Criteria:**
- [ ] Gambar menggunakan `object-contain` agar seluruh gambar terlihat
- [ ] Panel gambar memiliki container dengan tinggi tetap yang wajar
- [ ] Gambar tidak terpotong di viewport manapun (desktop & mobile)
- [ ] Mobile: gambar tetap di atas dengan lebar penuh (100% width)
- [ ] Typecheck/lint passes
- [ ] **[UI]** Verify in browser using dev-browser skill

## Functional Requirements

- FR-1: Overlay menggunakan CSS Grid 2 kolom di desktop (`grid grid-cols-2`)
- FR-2: Mobile (<768px): overlay kembali ke 1 kolom, gambar di atas, konten di bawah
- FR-3: Panel kiri (gambar): `overflow-hidden`, gambar `object-contain`, tinggi tetap proporsional (e.g. `h-[300px]` atau `h-full`)
- FR-4: Panel kanan (konten): `overflow-y-auto`, padding konsisten, urutan sesuai US-002
- FR-5: Hapus semua event listener Escape key dari component
- FR-6: Hapus `onClick={handleClose}` pada backdrop overlay
- FR-7: Hanya rendering tombol close (X) di pojok kanan atas panel kanan
- FR-8: Tombol aksi (View on GitHub + Back) di align-kiri, horizontal, di bagian bawah panel kanan
- FR-9: Data project tetap dibaca dari `src/data/projects.js` tanpa perubahan struktur
- FR-10: Animasi masuk/keluar overlay tetap menggunakan Framer Motion `AnimatePresence`

## Non-Goals

- Tidak mengubah layout card grid utama (tetap seperti semula)
- Tidak menambahkan fitur baru (filter, search, sorting)
- Tidak mengubah data structure di `projects.js`
- Tidak menambahkan keyboard shortcut selain tombol close
- Tidak mengubah animasi dasar (fade + scale tetap dipertahankan)

## Design Considerations

- Pertahankan tema dark minimal yang sudah ada (bg `#0e0e14`, surface `#15151e`, border `rgba(255,255,255,0.07)`)
- Font: Playfair Display untuk judul, Manrope untuk body
- Gap antara dua kolom: `gap-6`
- Panel kanan max-height: `max-h-[80vh]` agar tidak melebihi viewport
- Round corners: `rounded-2xl` konsisten
- Shadow: tidak perlu tambahan shadow, border cukup untuk definisi

## Technical Considerations

- Component: `ProjectsSection.jsx` — refactor overlay section saja
- Breakpoint: gunakan Tailwind `md:` (768px) untuk responsif
- Framer Motion: tetap gunakan `AnimatePresence` + `motion.div` untuk enter/exit
- Accessibility: overlay tetap `role="dialog" aria-modal="true"`
- Focus management: tetap fokus ke tombol close saat overlay terbuka

## Success Metrics

- Overlay tidak terlihat terlalu tinggi/memanjang
- Gambar tampil utuh tanpa clipping di semua ukuran layar
- Konten detail mudah dibaca di sisi kanan
- Tombol aksi mudah dijangkau tanpa scroll berlebihan
- Hanya tombol X yang bisa menutup overlay (tidak ada perilaku klik luar)

## Open Questions

- Tinggi ideal panel gambar: tinggi tetap (mis. `h-[300px]`) atau `h-full` mengikuti tinggi panel kanan?
- Jika deskripsi sangat panjang, apakah panel kanan perlu scroll internal?
- Apakah perlu menambahkan animasi transisi halus saat berpindah dari 1 kolom ke 2 kolom?
