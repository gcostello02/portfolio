FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Contact form (optional; set via build-arg in Cloud Build)
ARG PUBLIC_FORMSPREE_FORM_ID
ENV PUBLIC_FORMSPREE_FORM_ID=$PUBLIC_FORMSPREE_FORM_ID
ENV NODE_ENV=production
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/build ./build
EXPOSE 8080
CMD ["node", "build/index.js"]
