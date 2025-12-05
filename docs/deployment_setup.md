# Deployment Setup

## Option 1: Vercel (Recommended)

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a Git repository (GitHub, GitLab, BitBucket).
2.  Import the project into Vercel.
3.  Vercel will automatically detect Next.js and configure the build settings.
4.  Click **Deploy**.

## Option 2: Docker (Self-Hosted)

This project includes a production-ready `Dockerfile` optimized for Next.js standalone output.

### Prerequisites

- Docker installed on your server.
- Git.

### Steps

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jorismathijssen/portfolio.git
    cd portfolio
    ```

2.  **Build and Run with Docker Compose**:

    ```bash
    docker-compose up -d --build
    ```

    The application will be available at `http://localhost:3000`.

### Manual Docker Build

If you prefer not to use Compose:

```bash
# Build the image
docker build -t portfolio-app .

# Run the container
docker run -p 3000:3000 portfolio-app
```

## Environment Variables

Create a `.env.local` file for local development or configure environment variables in your deployment platform.

```bash
# Example
NEXT_PUBLIC_API_URL=https://api.example.com
```
