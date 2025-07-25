# Stage 1: Build aplikasi
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Gunakan ARG untuk menerima nilai VITE_BACKEND_BASE_URL dan VITE_VERIFICATOR_BASE_URL saat build
ARG VITE_BACKEND_BASE_URL
ARG VITE_VERIFICATOR_BASE_URL

# Set variabel lingkungan ini sebagai ENV agar Vite dapat membacanya saat build
# Ini memastikan bahwa nilai yang benar akan disematkan ke dalam bundle JavaScript
ENV VITE_BACKEND_BASE_URL=${VITE_BACKEND_BASE_URL}
ENV VITE_VERIFICATOR_BASE_URL=${VITE_VERIFICATOR_BASE_URL}

# Jalankan proses build. Sekarang, Vite akan menggunakan nilai dari ENV di atas.
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:stable-alpine AS production
# Salin hasil build dari stage 'build'
COPY --from=build /app/dist /usr/share/nginx/html
# Salin konfigurasi Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Jalankan Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]

# Catatan: Pastikan untuk memberikan nilai ARG saat build Docker
# Contoh:
# docker build \
#   --build-arg VITE_BACKEND_BASE_URL=http://backend-service:8080 \
#   --build-arg VITE_VERIFICATOR_BASE_URL=http://verifikator-service:8081 \
#   -t bostang/secure-onboarding-system-frontend:latest /direktori/proyek/frontend-secure-onboarding-system


#### SEBELUM MENGGUNAKAN ARG UNTUK URL VITE
# # Stage 1: Build aplikasi
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package*.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# # Stage 2: Serve via Nginx
# FROM nginx:stable-alpine AS production
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
