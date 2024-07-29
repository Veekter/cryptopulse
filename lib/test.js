var crypto = require("crypto");

// AES constants
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encryptData(data) {
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptData = cipher.update(data, "utf8", "hex");
  encryptData += cipher.final("hex");
  return encryptData;
}

function decryptData(cipherText) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decryptedData = decipher.update(cipherText, "hex", "utf8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
}

const originalText = "Hello World!";
const encryptedText = encryptData(originalText);
const decryptedText = decryptData(encryptedText);

console.log(`Original Text: ${originalText}`);
console.log(`Encrypted Text: ${encryptedText}`);
console.log(`Decrypted Text: ${decryptedText}`);
