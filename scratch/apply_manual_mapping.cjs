const fs = require('fs');
const content = JSON.parse(fs.readFileSync('extracted_content_module1.json', 'utf8'));

// The definitive mapping based on visual inspection
const mapping = {
    'Kirchhoff’s Current Law (KCL)': 'image_15.png',
    'Kirchhoff’s Voltage Law (KVL)': 'image_16.png',
    'Resistors in Series and Parallel': 'image_17.png',
    'Drift current vs Diffusion current': 'image_22.png',
    'PN Junction Formation': 'image_27.png',
    'Classification of Materials Based on Energy Bands': 'image_8.png',
    '1. Conductors': 'image_4.png',
    '2. Semiconductors': 'image_9.png',
    '3. Insulators': 'image_17.png', // Wait, subagent said 17 was resistors. Let's re-check.
    'Structure of an Atom': 'image_32.png',
    'Relationship Between Current, Voltage, and Power': 'image_3.png',
    'Ohm’s Law': 'image_1.png',
    'Voltage Divider Circuit': 'image_11.png',
    'Capacitors': 'image_31.png',
    'Inductors': 'image_10.png',
    'RC Circuits': 'image_26.png',
    'Why Silicon is Preferred Over Germanium': 'image_16.png'
};

// Remove ALL existing images from the content first to avoid duplicates
const cleanContent = content.filter(item => item.type !== 'img');

// Inject images after their respective headings
const fixedContent = [];
cleanContent.forEach(item => {
    fixedContent.push(item);
    
    // Check if this heading has a mapped image
    for (const [heading, imgSrc] of Object.entries(mapping)) {
        if (item.text && item.text.includes(heading)) {
            fixedContent.push({
                type: 'img',
                src: `images/${imgSrc}`,
                alt: heading
            });
            break;
        }
    }
});

fs.writeFileSync('extracted_content_module1.json', JSON.stringify(fixedContent, null, 2));
console.log('Successfully applied definitive manual mapping to JSON.');
