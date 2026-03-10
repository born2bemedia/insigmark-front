import fs from 'fs';

const content = fs.readFileSync('src/shared/ui/components/footer/Footer.tsx', 'utf-8');

// Find where match 16 ends
const tRegex =
  /t\(\s*(['"`])([\w.-]+)\1\s*,\s*\{[\s\S]*?fallback:\s*(['"`])((?:(?!\3)[^\\]|\\.)*?)\3[\s\S]*?\}\s*\)/g;

let m;
let count = 0;
let lastEnd = 0;
while ((m = tRegex.exec(content))) {
  count++;
  if (count === 16) {
    lastEnd = tRegex.lastIndex;
    console.log('Match 16 ends at index', lastEnd);
    console.log('Content from there:', JSON.stringify(content.substring(lastEnd, lastEnd + 200)));
    break;
  }
}

// Now search from lastEnd - does termsOfUse get found?
tRegex.lastIndex = lastEnd;
m = tRegex.exec(content);
console.log('\nNext match after 16:', m ? `Key: ${m[2]}` : 'NONE');
