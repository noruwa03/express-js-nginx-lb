FROM node:lts-alpine3.20

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]