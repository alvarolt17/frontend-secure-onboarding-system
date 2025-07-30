# Stage Pertama: Build Aplikasi Frontend
# Gunakan base image Node.js yang sesuai (misalnya Node.js 20)
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json (jika ada) terlebih dahulu.
COPY package.json ./
COPY package-lock.json ./

# Install dependensi
RUN npm install

# Copy seluruh source code frontend
COPY . .

# Gunakan ARG untuk menerima nilai VITE_BACKEND_BASE_URL dan VITE_VERIFICATOR_BASE_URL saat build
ARG VITE_BACKEND_BASE_URL
ARG VITE_VERIFICATOR_BASE_URL
# Tambahkan ARG untuk variabel Firebase
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID


# Set variabel lingkungan ini sebagai ENV agar Vite dapat membacanya saat build
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL}
ENV VITE_VERIFICATOR_BASE_URL=${VITE_VERIFICATOR_BASE_URL}
# Tambahkan ENV untuk variabel Firebase
ENV VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN}
ENV VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
ENV VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID}
ENV VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}

# Jalankan proses build. Sekarang, Vite akan menggunakan nilai dari ENV di atas.
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]