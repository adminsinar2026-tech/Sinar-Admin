# SINAR Admin

SINAR (Sistem Informasi, Ngaji dan Administrasi Rumah Ibadah) is an application built with Next.js and packaged with Docker to make building and running the application in a container easier.

## Technologies

- Next.js
- React
- Prisma ORM
- Supabase
- Docker

## Requirements

- Docker Desktop
- Docker Engine running

## Build Docker Image

Run the following command from the project's root directory using PowerShell:

```powershell
docker build `
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://ecxouflvxaulcaeuccbz.supabase.co" `
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_PUBLISHABLE_KEY" `
  -t sinar-admin:week6 .
```

Replace `YOUR_PUBLISHABLE_KEY` with the publishable key from your Supabase project.

## Run the Container

```powershell
docker run --name sinar-admin-test -p 3000:3000 sinar-admin:week6
```

Open the application in your browser:

http://localhost:3000/home

## Check the Container

To view running containers:

```powershell
docker ps
```

To stop the container:

```powershell
docker stop sinar-admin-test
```

To remove the container after stopping it:

```powershell
docker rm sinar-admin-test
```

## Testing

The application was tested by running it in a Docker container and checking the following pages and features:

- Home
- Profile
- Activity Schedule
- Administrators
- Financial Reports
- Inventory

Screenshots were captured as evidence of the Dockerization process.

## Configuration

The application requires the following Supabase environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Use a valid Supabase publishable key or legacy anon key. Do not include secret keys in frontend code or public repositories.

## Notes

The Docker image used for local testing is named `sinar-admin:week6`.