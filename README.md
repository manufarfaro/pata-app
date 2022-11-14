# PATA APP

This was our college degree team project, it was meant to be a POC of a start-up business that helped to connect vet professionals with pet-owners in an emergency-like situations. Offered a chat, preload of pet information and free calls and videocalls.

## Disclaimer

This is a POC done with academic purposes, you can use it, modify it and commercialize it respecting the GPL 3.0 license attached to this repository.

I'm also not responsible of this code and this code is given as-is, without warranties.

Last but not least, this was done during the free times of 2 people during 2 months, delivery times were severe, so probably not the best practices for most situations were provided here. Be mindful when trying to get ideas from this repo.

## Getting Started

First, you need to copy the .env file and set the following services:

```sh
cp .env.tpl .env
```

then in the file you can set the following services apis:

- Google Maps APIs
- CometChat API
- A database connection string (or any other database, local or hosted)
- NEXT Auth secrets and callback urls env vars

after then, you can install and run the development server:

```bash
npm i
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

[@manufarfaro](https://github.com/manufarfaro). UNLaM 2022. Locro Team. GPL 3.0 License.
