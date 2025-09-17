// checkCssConflicts.js (ES Module)
import fs from 'fs';
import path from 'path';

const searchClasses = [
  'bg-white', 'overflow-hidden', 'z-0', 'z-10', 'z-20',
  'bg-gray-100', 'bg-neutral-50', 'absolute', 'relative'
];

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (
      file.endsWith('.tsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.css')
    ) {
      results.push(file);
    }
  });
  return results;
};

const files = walk(path.resolve(process.cwd(), 'src'));

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf-8');
  searchClasses.forEach((cls) => {
    if (content.includes(cls)) {
      console.log(`Found "${cls}" in file: ${file}`);
    }
  });
});
