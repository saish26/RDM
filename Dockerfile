FROM devopsprabin/node:22 AS builder
ARG _ENV
WORKDIR /app

COPY package.json .
RUN npm install --production
COPY . .
RUN [ "$_ENV" != "production" ] && cp .env."$_ENV" .env.production || true
RUN npm run build

FROM devopsprabin/node:22 AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
