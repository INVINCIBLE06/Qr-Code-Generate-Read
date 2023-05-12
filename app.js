const qr = require('qr-image');
const fs = require('fs');

// Importing jimp
const Jimp = require("jimp");

// Importing qrcode-reader
const qrCodeReader = require('qrcode-reader'); 

// Generate QR code image and save to file
const qrCodeImage = qr.imageSync
(
    'Hello !',
    {
        type: 'png',
        size: 300,
        margin: 4,
    }
);

let qrName = `qr-Code` + Math.random();

fs.writeFileSync(`QrCode/${qrName}.png`, qrCodeImage);

console.log(`QR code is generated with file name :- ${qrName}.png`);

// Read the image and create a buffer
const buffer = fs.readFileSync(`QrCode/${qrName}.png`);

// Parse the image using Jimp.read()
Jimp.read(buffer, function(err, image) 
{
    if (err)
    {
        console.error(err);
    }
    
    // Creating an instance of qrcode-reader
    const qrCodeInstance = new qrCodeReader();

    qrCodeInstance.callback = function(err, value) 
    {
        if(err)
        {
            console.error(err);
        }
        
        // Printing the decrypted value
        // console.log(value.result);
    };
    // Decoding the QR code
    qrCodeInstance.decode(image.bitmap);
});
