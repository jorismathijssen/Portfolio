# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy the complete .next build
COPY .next ./.next
COPY public ./public
COPY package.json ./
COPY next.config.mjs ./

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["npm", "start"]
