// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import csp from 'vite-plugin-csp-guard'

export default defineConfig({
  plugins: [
    react(),
    csp({
      dev: { run: true },                           // buat CSP meta berjalan di `vite dev`
      algorithm: 'sha256',
      policy: {
        'default-src': ["'self'"],

        // Eksekusi <script src="..."> cocok untuk Google API SDK
        'script-src':       ["'self'"],
        'script-src-elem':  [
          "'self'",
          'https://apis.google.com'
        ],

        // Window fetch / XHR untuk Firebase Auth token exchange
        'connect-src': [
          "'self'",
          'https://api.myapp.com',
          'https://securetoken.googleapis.com',
          'https://identitytoolkit.googleapis.com',
          'https://firebaseinstallations.googleapis.com',
          'https://firebase.googleapis.com'
        ],

        // Google Fonts tidak inline, tapi via <link rel="stylesheet">
        'style-src':       ["'self'", 'https://fonts.googleapis.com'],
        'style-src-elem':  ["'self'", 'https://fonts.googleapis.com'],

        // File .woff2, .ttf dari Google Font
        'font-src':        ["'self'", 'https://fonts.gstatic.com'],

        'img-src':         ["'self'", 'data:', 'blob:']
      },
      build: {
        sri: true    // menambahkan Subresource Integrity secara build untuk hash resource
      }
    })
  ],

  build: { assetsInlineLimit: 0 },
  server: { host: true, port: 3000 },
  base: '/'
})
