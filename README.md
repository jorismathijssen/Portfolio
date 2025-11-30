# Portfolio

A simple, static HTML portfolio website.

## Overview

This is a minimalist portfolio for Joris Mathijssen, served as a static HTML site using Nginx.

## Architecture

- **Frontend**: Plain HTML/CSS
- **Server**: Nginx (Alpine Linux)
- **Deployment**: Docker Container

## Deployment

The project is containerized using Docker.

### Local Development

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 80:80 portfolio
```

### Production Deployment

The project is deployed using Docker Compose with an Nginx reverse proxy.

```bash
docker compose up -d --build portfolio
```
