// Script para encontrar claves no usadas de un JSON de traducciones en el workspace
// Uso: node find-unused-json-keys.js /ruta/al/json.json

const fs = require('fs');
const path = require('path');

// Recursivamente obtiene todas las claves en notación de puntos de un objeto
function getDotNotationKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (!Object.hasOwn(obj, key)) continue;
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getDotNotationKeys(value, newKey));
    } else {
      keys.push(newKey);
    }
  }
  return keys;
}

// Busca si una clave aparece en algún archivo del proyecto
function isKeyUsed(key, files) {
  const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    if (regex.test(content)) return true;
  }
  return false;
}

// Obtiene todos los archivos de código fuente
function getAllSourceFiles(dir, exts = ['.js', '.jsx', '.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllSourceFiles(filePath, exts));
    } else if (exts.includes(path.extname(file))) {
      results.push(filePath);
    }
  }
  return results;
}

// MAIN
if (process.argv.length < 3) {
  console.error('Uso: node find-unused-json-keys.js /ruta/al/json.json');
  process.exit(1);
}

const jsonPath = process.argv[2];
if (!fs.existsSync(jsonPath)) {
  console.error('No se encontró el archivo JSON:', jsonPath);
  process.exit(1);
}

const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const keys = getDotNotationKeys(json);

const workspaceRoot = process.cwd();
const files = getAllSourceFiles(workspaceRoot);

console.log(`Total de claves encontradas en el JSON: ${keys.length}`);
console.log('Buscando claves no usadas en el workspace...');

const unused = keys.filter(key => !isKeyUsed(key, files));

console.log(`\nClaves NO usadas (${unused.length}):`);
unused.forEach(k => console.log(k));

console.log('\n¡Listo!');
