################################################################################
# Create a stage for building the application.

ARG APP_NAME=artkremnev_client
FROM node:22.0-bookworm-slim AS build
WORKDIR /app

COPY ./src /app/src 
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./tsconfig.node.json /app/tsconfig.node.json
COPY ./vite.config.ts /app/vite.config.ts
COPY ./public /app/public
COPY ./index.html /app/index.html

RUN npm install
RUN npm run build 

################################################################################
# Create a stage for running the application.

FROM nginx:1.27.1-bookworm AS final

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

