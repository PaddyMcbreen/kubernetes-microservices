FROM node:20.9.0-alpine

COPY ./app.js ./app.js
COPY ./listen.js ./listen.js
COPY package.json package-lock.json ./
RUN npm install --production

ENV LIGHTS_SERVICE="http://lights-service.default.svc.cluster.local:3000"
ENV HEATING_SERVICE="http://heating-service.default.svc.cluster.local:3001"

EXPOSE 3002

ENTRYPOINT ["node", "listen.js"]
