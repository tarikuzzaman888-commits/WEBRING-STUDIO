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
  
  // Replace sharp corner classes with rounded ones
  content = content.replace(/rounded-lg dark:rounded-none/g, 'rounded-[2rem]');
  content = content.replace(/dark:rounded-none/g, 'rounded-[2rem]');
  content = content.replace(/rounded-md/g, 'rounded-full');
  content = content.replace(/rounded-lg/g, 'rounded-[2rem]');
  
  // Add neon-shadow to dark/black cards
  if (content.includes('bg-[#0D0D0D]') || content.includes('bg-[#000000]') || content.includes('bg-[var(--surface)]') || content.includes('bg-[var(--surface-2)]')) {
      content = content.replace(/className="(.*?)bg-(#0D0D0D|#000000|var\(--surface\)|var\(--surface-2\))(.*?)"/g, 'className="$1bg-$2 neon-shadow $3"');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});
