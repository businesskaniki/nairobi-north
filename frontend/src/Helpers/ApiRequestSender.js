import axios from 'axios';
import getDecryptedToken from './DecryptedToken';

const apiRequest = async (url, method, data = null, includeToken = true) => {
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
  
    if (includeToken) {
      const decryptedAccessToken = getDecryptedToken();
      config.headers.Authorization = `Bearer ${decryptedAccessToken}`;
    }
  
    if (data) {
      config.data = data;
    }
  
    const response = await axios.request({ url, method, ...config });
    return response.data;
  };

  export default apiRequest