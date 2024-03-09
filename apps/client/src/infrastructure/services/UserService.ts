import axios from 'axios';
import { BaseService } from './BaseService';
import { UserServiceType } from '../../application/User';

const signInWithCustomTokenUrl = process.env.REACT_APP_GOOGLE_CUSTOM_TOKEN_URL;
const tokenUrl = process.env.REACT_APP_GOOGLE_TOKEN_URL;
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

console.log('signInWithCustomTokenUrl', signInWithCustomTokenUrl);
console.log('tokenUrl', tokenUrl);
console.log('apiKey', apiKey);

export function useUserService(): UserServiceType {
  return {
    createUser: async () => {
      try {
        const response = await BaseService.post('/users/create');
        return response.data.token;
      } catch (error) {
        console.error('Error fetching custom token:', error);
        throw error;
      }
    },
    getIdToken: async (customToken) => {
      try {
        const response = await axios.post(
          `${signInWithCustomTokenUrl}?key=${apiKey}`,
          { token: customToken, returnSecureToken: true }
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching idToken:', error);
        throw error;
      }
    },
    getIdTokenWithRefreshToken: async (refreshToken) => {
      try {
        const response = await axios.post(
          `${tokenUrl}?key=${apiKey}`,
          { grant_type: 'refresh_token', refresh_token: refreshToken }
        );
        const newIdToken = response.data.id_token;
        const newRefreshToken = response.data.refresh_token;
        const newExpiresIn = Number(response.data.expires_in) * 1000;
        const newExpiresAt = new Date().getTime() + newExpiresIn;
        return {
          idToken: newIdToken,
          expiresAt: newExpiresAt,
          refreshToken: newRefreshToken,
        };
      } catch (error) {
        console.error('Error refreshing idToken:', error);
        throw error;
      }
    },
  }
}
