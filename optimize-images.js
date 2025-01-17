const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');
const svgo = require('svgo');  // Il faudra installer ce package

// Ajoutez cette fonction
async function optimizeSvg() {
    try {
        const svgDir = 'images/svg';
        const files = await fs.readdir(svgDir);
        const svgFiles = files.filter(file => file.endsWith('.svg'));

        console.log(`Found ${svgFiles.length} SVG files`);

        for (const file of svgFiles) {
            const filePath = path.join(svgDir, file);
            const svg = await fs.readFile(filePath, 'utf8');
            
            const result = svgo.optimize(svg, {
                multipass: true
            });

            await fs.writeFile(filePath, result.data);
            console.log(`✅ Optimized SVG: ${file}`);
        }
    } catch (error) {
        console.error('❌ Error optimizing SVGs:', error);
    }
}

// Modifiez la fonction principale
async function optimizeAll() {
    await optimizeImages();
    await optimizeSvg();
}

optimizeAll();