FROM node:20-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Formspree form ID for contact form (optional; set via build-arg in cloudbuild)
ARG VITE_FORMSPREE_FORM_ID
ENV VITE_FORMSPREE_FORM_ID=$VITE_FORMSPREE_FORM_ID
ENV NODE_ENV=production
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 8080
CMD ["node", "dist/index.cjs"]
