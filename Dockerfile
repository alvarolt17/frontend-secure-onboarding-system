# Stage Pertama: Build Aplikasi Frontend
# Gunakan base image Node.js yang sesuai (misalnya Node.js 20)
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada) terlebih dahulu.
# Ini memanfaatkan Docker layer caching: jika file-file ini tidak berubah,
# npm install tidak akan dijalankan ulang di build berikutnya, mempercepat proses.
# Karena Dockerfile ini berada di dalam folder frontend-secure-onboarding-system,
# jalur COPY sekarang relatif terhadap folder tersebut.
COPY package.json ./
COPY package-lock.json ./

# Install dependensi
RUN npm install

# Copy seluruh source code frontend
# Pastikan semua file proyek (termasuk public, src, dll.) disalin setelah dependensi diinstal.
# Karena Dockerfile ini berada di dalam folder frontend-secure-onboarding-system,
# jalur COPY sekarang relatif terhadap folder tersebut.
COPY . .

# Build aplikasi Vite/React
# Perintah ini akan menghasilkan file-file statis yang siap disajikan.
RUN npm run build

# ---

# Stage Kedua: Serving Aplikasi dengan Nginx
# Gunakan base image Nginx yang ringan
FROM nginx:alpine

# Copy hasil build dari stage 'build' ke direktori Nginx default
# '/usr/share/nginx/html' adalah lokasi default Nginx untuk file statis.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx kustom.
# Pastikan Anda telah membuat file nginx.conf di direktori frontend-secure-onboarding-system.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 untuk Nginx
# Ini memberi tahu Docker bahwa container akan mendengarkan di port ini.
EXPOSE 80

# Command untuk memulai Nginx di foreground.
# "daemon off;" memastikan Nginx tetap berjalan di foreground agar container tidak langsung mati.
CMD ["nginx", "-g", "daemon off;"]