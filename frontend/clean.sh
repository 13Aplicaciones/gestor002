##
## Compila y limpia los proyectos de la aplicación
##
## Author: omargo33
## Date: 2025-02-10
##
## Usage: ./clean.sh
##
cd api_fetch 
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd demo_remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd frontend-oauth2
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd orchestrator_remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd gestor_remote
rm -rf dist node_modules package-lock.json
npm install 
cd ..

cd portal
rm -rf dist node_modules package-lock.json
npm install 
cd ..
