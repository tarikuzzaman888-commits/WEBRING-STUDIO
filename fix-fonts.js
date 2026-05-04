const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('/Users/sabbir/Desktop/WEBRING/app').concat(walk('/Users/sabbir/Desktop/WEBRING/components'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/font-display dark:font-condensed font-bold dark:font-black dark:uppercase dark:tracking-tight/g, 'font-display font-black uppercase tracking-tight');
  content = content.replace(/font-display dark:font-condensed font-bold dark:font-black dark:uppercase/g, 'font-display font-black uppercase');
  content = content.replace(/font-display dark:font-condensed dark:uppercase font-bold dark:font-black/g, 'font-display font-black uppercase');
  content = content.replace(/font-display dark:font-condensed font-bold dark:font-black/g, 'font-display font-black');
  content = content.replace(/font-display dark:font-condensed dark:uppercase/g, 'font-display uppercase');
  content = content.replace(/font-display dark:font-condensed/g, 'font-display');
  content = content.replace(/font-body dark:font-condensed/g, 'font-display');
  content = content.replace(/dark:font-condensed/g, 'font-display');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
