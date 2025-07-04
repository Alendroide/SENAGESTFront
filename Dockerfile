FROM node:22.17.0-alpine3.21
WORKDIR /app/
COPY package*.json .
RUN npm install
EXPOSE 5173
COPY . .
ENV VITE_API_URL = 'http://localhost:3000/'
CMD ["npm","run","dev"]