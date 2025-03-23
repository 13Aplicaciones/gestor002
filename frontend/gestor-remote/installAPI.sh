rm -rf node_modules package-lock.json

npm remove ux-ui
npm remove api-fetch

npm install ../ux-ui
npm install ../api-fetch

npm link ../ux-ui/node_modules/react
npm link ../api-fetch/node_modules/react

npm install
npm audit fix

echo -e "\e[32m---------------- install api-fetch and ux-ui finished ---------------- \e[0m"
