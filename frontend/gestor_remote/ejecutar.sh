## rm -rf node_modules package-lock.json
npm remove api-fetch
npm install ../api-fetch
npm link ../api-fetch/node_modules/react

npm run dev
