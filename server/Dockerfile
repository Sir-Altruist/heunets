FROM node:20.19-alpine AS builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.19-alpine AS production

RUN addgroup -g 1001 -S nodejs && adduser -S heunet-server -u 1001

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && yarn cache clean

COPY --from=builder /app/dist ./dist

RUN chown -R heunet-server:nodejs /app
USER heunet-server

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD pgrep -f "node dist/server.js" > /dev/null || exit 1

EXPOSE 8000

CMD ["yarn", "start"]