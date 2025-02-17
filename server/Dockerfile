# Gunakan image Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy seluruh project
COPY . .

RUN npx prisma generate

# Build aplikasi NestJS
RUN npm run build

# Jalankan aplikasi NestJS
CMD ["npm", "run", "start:prod"]