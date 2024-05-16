import CryptoJS from "crypto-js";

export function decryptRoles(encryptedRoles: any) {
  // Decrypt the encrypted roles using CryptoJS or any other encryption library
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedRoles, process.env.ENCRYPTION_KEY as string);
  const decryptedRoles = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedRoles);
}
