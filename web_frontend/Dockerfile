# --------------------
# Stage build
# --------------------
FROM node:20 AS build
WORKDIR /COTS

# Copy package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build project
RUN npm run build

# --------------------
# Stage production
# --------------------
FROM nginx:alpine

# Copy thư mục dist đúng từ stage build
COPY --from=build /COTS/dist /usr/share/nginx/html

# Expose port Nginx (80 là chuẩn)
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
