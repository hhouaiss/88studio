const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

async function optimizeImages() {
    try {
        const inputDir = 'images/original';
        const outputDir = 'images/optimized';

        // Lire le dossier des images originales
        const files = await fs.readdir(inputDir);

        // Filtrer uniquement les images
        const imageFiles = files.filter(file => 
            /\.(jpg|jpeg|png)$/i.test(file)
        );

        console.log(`Found ${imageFiles.length} images to optimize`);

        // Optimiser chaque image
        for (const file of imageFiles) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

            await sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath);

            const stats = await fs.stat(inputPath);
            const optimizedStats = await fs.stat(outputPath);
            const savings = ((stats.size - optimizedStats.size) / stats.size * 100).toFixed(2);

            console.log(`✅ Optimized: ${file}`);
            console.log(`   Size reduced by ${savings}%`);
        }

        console.log('🎉 Optimization complete!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

optimizeImages();