## rm -rf node_modules package-lock.json
npm remove ux-ui
npm install ../ux-ui
npm link ../ux-ui/node_modules/react

npm remove api-fetch
npm install ../api-fetch
npm link ../api-fetch/node_modules/react

npm run dev
