# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple static HTML portfolio website for Joris Mathijssen.

## Architecture

- **Type**: Static HTML
- **Server**: Nginx
- **Container**: Docker

## Development

- `index.html`: The main entry point.
- `Dockerfile`: Nginx configuration for serving the static file.
- `docker-compose.yml`: Production deployment configuration.

## Commands

- `docker build -t portfolio .`: Build the Docker image.
- `docker run -p 80:80 portfolio`: Run locally.