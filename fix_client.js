const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const badPattern1 = "import Image from 'next/image';\n\"use client\";";
    const goodPattern1 = "\"use client\";\nimport Image from 'next/image';";
    
    const badPattern2 = "import Image from 'next/image';\n'use client';";
    const goodPattern2 = "'use client';\nimport Image from 'next/image';";

    let modified = false;

    if (content.includes(badPattern1)) {
        content = content.replace(badPattern1, goodPattern1);
        modified = true;
    }
    if (content.includes(badPattern2)) {
        content = content.replace(badPattern2, goodPattern2);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed", filePath);
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
