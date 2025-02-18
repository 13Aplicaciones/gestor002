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

cd demo-remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd frontend-oauth2
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd orchestrator-remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd gestor-remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd portal
rm -rf dist node_modules package-lock.json
npm install 
cd ..
