const fs = require('fs');

const envConfigPath = './dist/env.js';
const envPrefix = 'JS_APP_';

if (fs.existsSync(envConfigPath)) {
  fs.unlinkSync(envConfigPath);
}

fs.writeFileSync(envConfigPath, 'window._env_ = {\n');

console.log('***Loaded env values***');
for (const key in process.env) {
  if (key.startsWith(envPrefix)) {
    const value = process.env[key];
    fs.appendFileSync(envConfigPath, `  ${key}: "${value}",\n`);
    console.log(`${key}: ${value}`);
  }
}

fs.appendFileSync(envConfigPath, '};\n');
