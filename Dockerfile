
FROM node:22.15.0 AS build

WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM nginx:alpine
# Указываем базовый образ
# FROM node:22.15.0

# Устанавливаем Nginx
# RUN apt-get update && apt-get install -y nginx

COPY --from=build /app/build /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80 

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
# CMD ["sh", "-c", "nginx && node /server.js"]
# Используем образ Node.js для сборки приложения
# FROM node:22.15.0 AS build
# WORKDIR /app

# # Копируем package.json и устанавливаем зависимости
# COPY package*.json ./
# RUN npm install

# # Копируем остальные файлы и собираем приложение
# COPY . .

# # Собираем клиентскую часть (React)
# RUN npm run build

# # Используем тот же образ Node.js для запуска приложения
# FROM node:22.15.0

# WORKDIR /app

# # Копируем только необходимые файлы из стадии сборки
# COPY package*.json ./
# RUN npm install

# # Копируем исходный код приложения
# COPY . .

# # Экспонируем порты, которые будут использоваться
# EXPOSE 80 3030

# # Запускаем сервер и клиент одновременно
# CMD ["npm", "start"]
