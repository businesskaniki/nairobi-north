import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


const decryptionKey = 'accesstoken';
const RefreshDecryptionkey = 'refreshtoken'

function getDecryptedToken() {
  const encryptedToken = Cookies.get('ac-tok-en');

  if (encryptedToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, decryptionKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedToken;
    } catch (error) {
      console.error('Token decryption error:', error);
    }
  }

  return null; 
}

export function getDecryptedRefreshToken() {
  const encryptedRefreshToken = Cookies.get('ref-tok-en');

  if (encryptedRefreshToken) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedRefreshToken, RefreshDecryptionkey);
      const decryptedRefreshToken = bytes.toString(CryptoJS.enc.Utf8);
      console.log(decryptedRefreshToken);
      return decryptedRefreshToken;
    } catch (error) {
      console.error('Token decryption error:', error);
    }
  }

  return null; 
}

export default getDecryptedToken;
