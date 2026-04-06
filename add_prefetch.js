const fs = require('fs');
const path = require('path');

let count = 0;

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.next')) {
                walk(filePath);
            }
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx')) {
                let content = fs.readFileSync(filePath, 'utf8');
                if (content.includes('<Link')) {
                    // Replace <Link tags without prefetch prop
                    const newContent = content.replace(/<Link\s+(?![^>]*prefetch)/gi, '<Link prefetch={false} ');
                    if (newContent !== content) {
                        fs.writeFileSync(filePath, newContent, 'utf8');
                        count++;
                        console.log('Updated', filePath);
                    }
                }
            }
        }
    });
}

walk('.');
console.log('Total files updated:', count);
