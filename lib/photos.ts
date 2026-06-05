/* ============================================================
   Photo gallery data
   Add new events by appending to EVENTS and PHOTOS arrays.
   ============================================================ */

export type Photo = {
  src: string
  event: string
  category: string
  caption?: string
}

export type Event = {
  id: string
  label: string
  year: number
}

export const EVENTS: Event[] = [
  { id: 'hoang-hiyu-2025',        label: 'Hoang @ Hiyu 2025',      year: 2025 },
  { id: 'dj-isaac-2025',          label: 'DJ Isaac 2025',           year: 2025 },
  { id: 'senpai-squad-2026',      label: 'Senpai Squad 2026',       year: 2026 },
  { id: 'lil-texas-2026',         label: 'Lil Texas 2026',          year: 2026 },
  { id: 'juelz-san-holo-2026',    label: 'Juelz b2b San Holo',      year: 2026 },
  { id: 'kawaii-rave-texas-2026', label: 'Kawaii Rave Texas 2026',  year: 2026 },
  { id: 'express-tubes',          label: 'Express Tubes',           year: 2025 },
]

export const PHOTOS: Photo[] = [
  // ── Hoang @ Hiyu 2025 ──────────────────────────────────────
  { src: '/images/hoang-hiyu-2025/DSCF2183.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2198.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2391.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2518.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2642-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2867-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF2887-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF3000.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF3007-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF3015-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF3215.jpg',   event: 'hoang-hiyu-2025', category: 'Nightlife' },
  { src: '/images/hoang-hiyu-2025/DSCF3379-2.jpg', event: 'hoang-hiyu-2025', category: 'Nightlife' },

  // ── DJ Isaac 2025 ───────────────────────────────────────────
  { src: '/images/dj-isaac-2025/DSC00328.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00398.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00403.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00544.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00655.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00658.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },
  { src: '/images/dj-isaac-2025/DSC00663.jpg', event: 'dj-isaac-2025', category: 'Nightlife' },

  // ── Senpai Squad 2026 ───────────────────────────────────────
  { src: '/images/senpai-squad-2026/_A7R0046.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0073.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0183.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0318.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0342.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0434.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0435.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0448.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0600.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },
  { src: '/images/senpai-squad-2026/_A7R0657.jpg', event: 'senpai-squad-2026', category: 'Nightlife' },

  // ── Lil Texas 2026 ──────────────────────────────────────────
  { src: '/images/lil-texas-2026/DSC03209.jpg', event: 'lil-texas-2026', category: 'Nightlife' },
  { src: '/images/lil-texas-2026/DSC03339.jpg', event: 'lil-texas-2026', category: 'Nightlife' },
  { src: '/images/lil-texas-2026/DSC03732.jpg', event: 'lil-texas-2026', category: 'Nightlife' },
  { src: '/images/lil-texas-2026/DSC03767.jpg', event: 'lil-texas-2026', category: 'Nightlife' },
  { src: '/images/lil-texas-2026/DSC03770.jpg', event: 'lil-texas-2026', category: 'Nightlife' },

  // ── Kawaii Rave Texas 2026 ──────────────────────────────────
  { src: '/images/kawaii-rave-texas-2026/_A7R2484.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2625.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2648.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2759.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2803.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2807.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2836.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2837.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2879.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2890.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },
  { src: '/images/kawaii-rave-texas-2026/_A7R2919.jpg', event: 'kawaii-rave-texas-2026', category: 'Nightlife' },

  // ── Juelz b2b San Holo ──────────────────────────────────────
  { src: '/images/juelz-san-holo-2026/DSC02145_2.jpg', event: 'juelz-san-holo-2026', category: 'Nightlife' },
  { src: '/images/juelz-san-holo-2026/DSC02229_2.jpg', event: 'juelz-san-holo-2026', category: 'Nightlife' },
  { src: '/images/juelz-san-holo-2026/DSC02400.jpg',   event: 'juelz-san-holo-2026', category: 'Nightlife' },
  { src: '/images/juelz-san-holo-2026/DSC02442.jpg',   event: 'juelz-san-holo-2026', category: 'Nightlife' },
  { src: '/images/juelz-san-holo-2026/DSC02462.jpg',   event: 'juelz-san-holo-2026', category: 'Nightlife' },
  { src: '/images/juelz-san-holo-2026/DSC02476_2.jpg', event: 'juelz-san-holo-2026', category: 'Nightlife' },

  // ── Express Tubes — Promotional Materials ───────────────────
  { src: '/images/express-tubes/DSCF4497.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4453.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4514.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4517.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4527.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4680.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4752.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4902.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF4930.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF3703.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF3725.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF3785.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF3800.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF3803.jpg', event: 'express-tubes', category: 'Promotional' },
  { src: '/images/express-tubes/DSCF9133.jpg', event: 'express-tubes', category: 'Promotional' },
]
