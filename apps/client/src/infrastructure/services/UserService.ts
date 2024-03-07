import axios from 'axios';
import {BaseService} from './BaseService';
import { UserServiceType } from '../../application/User/UserServiceType';

const signInWithCustomTokenUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken';
const tokenUrl = 'https://securetoken.googleapis.com/v1/token';
const apiKey = 'YOUR_API_KEY';

export function useUserService(): UserServiceType {
  return {
    createUser: async () => {
      try {
        const response = await BaseService.post('/users/create');
        console.log('createUser', response.data.token);
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
        console.log('getIdToken', response.data);
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
        console.log('getIdTokenWithRefreshToken', {
          idToken: newIdToken,
          expiresAt: newExpiresAt,
          refreshToken: newRefreshToken,
        });
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
