# Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only what is needed for standalone output
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
COPY package.json ./
COPY next.config.mjs ./

# Optional: set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
