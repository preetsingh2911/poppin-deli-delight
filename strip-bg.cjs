const fs = require('fs');

const path = 'src/assets/lottie/hero-poppin-cup.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// The background is usually the last layer (bottom)
const lastLayer = data.layers[data.layers.length - 1];

console.log("Analyzing last layer...");
console.log(JSON.stringify(lastLayer).substring(0, 500) + "...");

// Just to be safe, let's remove it and save it to a new file so we can swap it
data.layers.pop(); // Remove the last layer

fs.writeFileSync('src/assets/lottie/hero-poppin-cup-nobg.json', JSON.stringify(data));
console.log("Saved as hero-poppin-cup-nobg.json without the last layer.");
