const qrcode = require('qrcode-terminal');
const vegId = process.argv[2] || 'VEG001';


// ယခု Demo အတွက် ပုံစံတူ Link ဖန်တီးထားခြင်း ဖြစ်ပါသည်။
const mockWebsiteUrl = `https://my-organic-farm.com/traceability?id=${vegId}`;

console.log(`\n=========================================`);
console.log(`🌱 သင့်ဟင်းသီးဟင်းရွက် (ID: ${vegId}) အတွက် QR Code`);
console.log(`=========================================\n`);
console.log(`ဖုန်းကင်မရာဖြင့် အောက်ပါ QR ကို Scan ဖတ်ကြည့်ပါ:\n`);

// Terminal တွင် QR Code ပုံဖော်ခြင်း
qrcode.generate(mockWebsiteUrl, {small: true});
