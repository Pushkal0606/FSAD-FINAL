import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'frontend', 'src');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
            walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Backgrounds
    content = content.replace(/bg-\[#F5EFE6\]\/90/g, 'bg-[#111]');
    content = content.replace(/bg-\[#F5EFE6\]\/70/g, 'bg-black');
    content = content.replace(/bg-\[#F5EFE6\]/g, 'bg-black');
    
    content = content.replace(/bg-\[#EDE3D2\]\/80/g, 'bg-black');
    content = content.replace(/bg-\[#EDE3D2\]\/90/g, 'bg-black');
    content = content.replace(/bg-\[#EDE3D2\]/g, 'bg-black');
    
    content = content.replace(/bg-\[#E6D8C3\]/g, 'bg-[#111]');
    content = content.replace(/hover:bg-\[#E6D8C3\]/g, 'hover:bg-[#222]');

    // Primary Actions / Accents
    content = content.replace(/bg-\[#A67B5B\]/g, 'bg-[#a855f7]');
    content = content.replace(/hover:bg-\[#6F4E37\]/g, 'hover:bg-purple-700');
    
    // Borders
    content = content.replace(/border-\[#D2B48C\]\/40/g, 'border-[#333]');
    content = content.replace(/border-\[#D2B48C\]\/20/g, 'border-[#333]');
    content = content.replace(/border-\[#D2B48C\]/g, 'border-[#333]');
    
    content = content.replace(/border-\[#A67B5B\]/g, 'border-[#a855f7]');
    content = content.replace(/border-t-\[#A67B5B\]/g, 'border-t-[#a855f7]');
    content = content.replace(/border-l-\[#A67B5B\]/g, 'border-l-[#a855f7]');
    
    content = content.replace(/hover:border-\[#A67B5B\]/g, 'hover:border-[#a855f7]');
    content = content.replace(/hover:border-\[#6F4E37\]/g, 'hover:border-purple-700');
    content = content.replace(/hover:border-t-\[#A67B5B\]/g, 'hover:border-t-[#a855f7]');
    content = content.replace(/hover:border-l-\[#A67B5B\]/g, 'hover:border-l-[#a855f7]');

    // Texts
    content = content.replace(/text-\[#3E2C23\]/g, 'text-white');
    content = content.replace(/text-\[#6F4E37\]/g, 'text-gray-400');
    content = content.replace(/text-\[#8B6F5C\]/g, 'text-gray-400');
    content = content.replace(/text-\[#A67B5B\]/g, 'text-[#a855f7]');
    
    content = content.replace(/hover:text-\[#A67B5B\]/g, 'hover:text-[#a855f7]');
    content = content.replace(/hover:text-\[#6F4E37\]/g, 'hover:text-gray-300');
    content = content.replace(/hover:text-\[#3E2C23\]/g, 'hover:text-white');

    // Fills (SVG Patterns)
    content = content.replace(/fill="#D2B48C"/g, 'fill="#4c1d95"');
    
    // Backdrop blur
    content = content.replace(/backdrop-blur(?:-[a-z]+)?/g, '');
    
    // Clean up multiple spaces that might result from replacing backdrop-blur
    content = content.replace(/  +/g, ' ');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

walk(srcDir, processFile);
console.log('Color replacement complete.');
