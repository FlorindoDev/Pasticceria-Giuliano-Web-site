FROM node:current-alpine

#decommentare se si vuole usare per lo sviluppo
#RUN npm install -g @angular/cli@latest
#RUN apk update && apk add --no-cache git

WORKDIR /app

COPY . .

RUN npm install


CMD ["npm", "start"]