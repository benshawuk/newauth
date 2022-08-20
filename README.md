# Sveltekit Cookie Authentication
Working example of cookie authentication in Sveltekit
- Working on 1.0.0-next.428  (20th Aug 2022, after breaking changes)
- Thanks for the ideas and knowledge: https://joyofcode.xyz/sveltekit-authentication-using-cookies

## Project Setup

🧑‍🤝‍🧑 Clone the project

```sh
git clone https://github.com/benshawuk/newauth.git
```

📦️ Install dependencies

```sh
cd newauth
npm i
```

## Database

✏️ Rename `env.example` to `.env`

```
DATABASE_URL="file:./dev.db"
```

🔨 Create the database from the Prisma schema

```sh
npx prisma db push
```

🔎 Inspect your database with Prisma Studio

```
npx prisma studio
```

## Development

🦄 Start the project and open http://localhost:5173/

```sh
npm run dev
```

## Production

🔨 Build and preview

```sh
npm run build && npm run preview
```




