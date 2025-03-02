## rm -rf node_modules package-lock.json
npm remove api-fetch
npm install ../api-fetch
npm link ../api-fetch/node_modules/react

echo -e "\e[32m---------------- install api-fetch finished ---------------- \e[0m"
