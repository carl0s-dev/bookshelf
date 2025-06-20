# Bookshelf
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

### Executando com Docker

```sh
docker compose up
```

### Executando Manualmente

#### • Back-End
```sh
cd bookshelf-api

cp .env.example .env

npm i

npm run build

npm run start
```

#### • Front-End
```sh
cd bookshelf-web

cp .env.example .env

npm i

npm run build

npm run start
```