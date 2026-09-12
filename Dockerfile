# ---- Etapa 1: build ----
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# ---- Etapa 2: runtime ----
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/src ./src

# usuario no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p logs uploads/documents uploads/proofs && chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000

CMD ["node", "src/server.js"]