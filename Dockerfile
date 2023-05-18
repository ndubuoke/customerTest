# Stage 1 - Build the application
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npx tailwindcss -i ./src/styles/start.css -o ./src/styles/final.css
RUN npm install --legacy-peer-deps
RUN npm run build:dev

COPY . .


# Stage 2 - Serve the application using Nginx

FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
