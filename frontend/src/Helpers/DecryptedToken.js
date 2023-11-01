import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';


const decryptionKey = 'accesstoken';

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

export default getDecryptedToken;
