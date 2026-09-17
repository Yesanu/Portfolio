# PRD: AboutSection — Minimalist Timeline

## Problem Statement

AboutSection saat ini terlalu ramai dengan label "About", nama besar, role, dan bio paragraph sebelum masuk ke konten timeline. Pengunjung langsung scroll melewati header tanpa nilai membaca, menambah vertical space yang sia-sia di section yang tujuannya cuma menampilkan Education & Experience.

## Goals

- Mengurangi vertical whitespace yang tidak memberi nilai di bagian atas section
- Fokus langsung ke konten timeline (Education & Experience)
- Mempertahankan visual hierarchy yang tetap jelas tanpa judul tambahan

## User Stories

### US-001: Hapus elemen header AboutSection
**Description:** Sebagai pengunjung, saya ingin section About langsung menampilkan timeline tanpa judul pembuka yang redundan, agar saya bisa langsung mengakses informasi penting.

**Acceptance Criteria:**
- [ ] Label "About" (`.about-label`) dihapus dari JSX
- [ ] Judul nama (`{about.name}`) dihapus dari JSX
- [ ] Role (`{about.role}`) dihapus dari JSX
- [ ] Bio paragraph (`{about.bio}`) dihapus dari JSX
- [ ] Wrapper `about-header` masih ada (bisa dipertahankan untuk stagger animation)
- [ ] Typecheck passes
- [ ] Verify in browser — timeline muncul tanpa jeda header kosong

### US-002: Pertahankan layout 2 kolom Education | Experience
**Description:** Sebagai pengunjung, saya ingin tetap melihat Education di kiri dan Experience di kanan dalam grid, agar saya bisa membandingkan keduanya secara visual.

**Acceptance Criteria:**
- [ ] `grid md:grid-cols-2 gap-16` tetap ada
- [ ] Header masing-masing kolom ("Education" / "Experience") tetap tampil
- [ ] Ikon badge di header kolom tetap ada
- [ ] Timeline items (education + experience) tetap sama semua
- [ ] Verify in browser — layout 2 kolom intact

## Functional Requirements

- FR-1: Hapus `.about-label` span (baris 39-41)
- FR-2: Hapus `h2.about-title` yang menampilkan `{about.name}` (baris 42-44)
- FR-3: Hapus `p.about-role` yang menampilkan `{about.role}` (baris 45)
- FR-4: Hapus `p.about-bio` yang menampilkan `{about.bio}` (baris 46-48)
- FR-5: Pertahankan `about-header` motion.div wrapper dengan stagger variants untuk konsistensi animasi
- FR-6: Tidak mengubah struktur grid timeline atau data `about.js`

## Non-Goals

- Tidak mengubah data `about.js`
- Tidak mengubah animasi timeline items
- Tidak menambahkan CTA baru
- Tidak mengubah warna, spacing, atau style lainnya
- Tidak mengubah section padding (`py-32`)

## Design Considerations

- Section akan memiliki whitespace lebih besar di atas karena tidak ada judul — ini disengaja, sesuai arahan user
- Stagger animation pada `.about-header` masih berjalan tapi tanpa children yang terlihat; bisa dipertahankan untuk konsistensi struktur motion
- Alternatif: hapus juga wrapper `about-header` dan pindahkan stagger ke langsung `.about-timeline` — tapi untuk minimal diff, pertahankan struktur yang ada

## Technical Considerations

- File: `src/components/AboutSection.jsx` (JSX only, no TypeScript)
- Tidak ada dependency baru
- Build system: Vite, harus tetap clean
- Font: Playfair Display untuk judul timeline (`font-display`) — tidak terpengaruh

## Success Metrics

- Jumlah baris kode di AboutSection berkurang ~10-15 baris
- Visual: tidak ada area kosong yang terasa "mencueki" sebelum timeline
- Scroll depth: user langsung melihat timeline tanpa melewati 3-4 baris konten yang di-skip

## Open Questions

- Apakah stagger animation pada `about-header` masih perlu dipertahankan kalau tidak ada anak yang terlihat? (opsional cleanup)
