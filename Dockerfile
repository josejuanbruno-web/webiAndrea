FROM node:20-slim AS build
WORKDIR /app
COPY package.json ./
# El lockfile no se copia: se generó en otra plataforma y npm ci arrastra el bug
# de optional dependencies de rollup (https://github.com/npm/cli/issues/4828).
# npm install lo regenera resolviendo los binarios nativos correctos para Linux.
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
