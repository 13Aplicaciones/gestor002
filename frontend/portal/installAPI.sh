## rm -rf node_modules package-lock.json
npm remove ux-ui
npm install ../ux-ui
npm link ../ux-ui/node_modules/react

npm remove api-fetch
npm install ../api-fetch
npm link ../api-fetch/node_modules/react

echo -e "\e[32m---------------- install api-fetch and ux-ui finished ---------------- \e[0m"
