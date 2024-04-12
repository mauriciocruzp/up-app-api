
# UP App Hexagonal API

This an API developed on Typescript for for an educational information platform. 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_HOST`

`DB_USER`

`DB_PORT`

`DB_PASSWORD`

`DB_NAME`

`CRYPTO_KEY`

`JWT_SECRET`

`S3_BUCKET_NAME`

`S3_ACCESS_KEY_ID`

`S3_SECRET_ACCESS_KEY`

`S3_REGION`


## Run Locally With NPM

Clone the project

```bash
  git clone https://github.com/mauriciocruzp/up-app-api
```

Go to the project directory

```bash
  cd up-app-api
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Run Locally With Docker

Clone the project

```bash
  git clone https://github.com/mauriciocruzp/up-app-api
```

Go to the project directory

```bash
  cd up-app-api
```

Build image

```bash
  docker build -t up-app-api .
```

Build container and run

```bash
  docker run -p 3001:3001 up-app-api
```

