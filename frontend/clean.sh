##
## Compila y limpia los proyectos de la aplicación
##
## Author: omargo33
## Date: 2025-02-10
##
## Usage: ./clean.sh
##
cd api-fetch 
rm -rf dist node_modules package-lock.json
npm install 
npm run build
cd ..
echo -e "\e[32m---------------- api-fetch finished ---------------- \e[0m"

cd ux-ui
rm -rf dist node_modules package-lock.json
npm install 
./installAPI.sh
cd ..
echo -e "\e[32m---------------- ux-ui finished ---------------- \e[0m"

cd demo-remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..
echo -e "\e[32m---------------- demo-remote finished ---------------- \e[0m"


cd frontend-oauth2
rm -rf dist node_modules package-lock.json
npm install 
cd ..
echo -e "\e[32m---------------- frontend-oauth2 finished ---------------- \e[0m"


cd gestor-remote
rm -rf dist node_modules package-lock.json
npm install
./installAPI.sh 
cd ..
echo -e "\e[32m---------------- gestor-remote finished ---------------- \e[0m"


cd orchestrator-remote
rm -rf dist node_modules package-lock.json
npm install
./installAPI.sh 
cd ..
echo -e "\e[32m---------------- orchestrator-remote finished ---------------- \e[0m"


cd portal
rm -rf dist node_modules package-lock.json
npm install 
./installAPI.sh
cd ..
echo -e "\e[32m---------------- portal finished ---------------- \e[0m"

