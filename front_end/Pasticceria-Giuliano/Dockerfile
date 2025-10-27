FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build 

FROM nginx:alpine
COPY --from=build /app/dist/angular-app/browser /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/ssl/cert.pem /etc/ssl/certs/cert.pem
COPY --from=build /app/ssl/key.pem /etc/ssl/private/key.pem

# daemon off; non fa andare in background nginx cosi non si chiude il container
CMD ["nginx", "-g", "daemon off;"] 