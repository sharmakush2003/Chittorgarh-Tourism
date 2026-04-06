const fs = require('fs');
const path = require('path');
let count = 0;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('<img')) return;

    let hasImport = content.match(/import\s+Image\s+from\s+['"]next\/image['"]/);
    let modifiedUrl = content.replace(/<img([\s\S]*?)(\/?)>/gi, (match, attrs, selfClose) => {
        if (!match.toLowerCase().startsWith('<img')) return match;
        let newAttrs = attrs;
        if (!newAttrs.includes('width=')) newAttrs += ' width={1200}';
        if (!newAttrs.includes('height=')) newAttrs += ' height={800}';
        if (newAttrs.includes('style={{')) {
            newAttrs = newAttrs.replace('style={{', 'style={{ objectFit: "cover", ');
        } else if (!newAttrs.includes('style={')) {
            newAttrs += ' style={{ objectFit: "cover" }}';
        }
        return `<Image${newAttrs}${selfClose ? '/' : ''}>`;
    });

    if (modifiedUrl !== content) {
        if (!hasImport) {
            modifiedUrl = "import Image from 'next/image';\n" + modifiedUrl;
        }
        fs.writeFileSync(filePath, modifiedUrl, 'utf8');
        count++;
    }
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.next') && !filePath.includes('api')) walk(filePath);
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) processFile(filePath);
        }
    });
}

walk('./components');
walk('./app');
console.log('Total files updated:', count);
