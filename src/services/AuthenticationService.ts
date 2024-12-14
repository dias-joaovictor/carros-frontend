import axios, { AxiosInstance } from 'axios';
import { CookieManager } from './CookieManager';
const BASE_URL = process.env.REACT_APP_BACKEND_URL;


class AuthenticationService {

  protected axios: AxiosInstance;

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
    });

    this.axios.interceptors.request.use(
      (config) => {

        const cookieName = "CF_Authorization";
        const cookieValue = CookieManager.getCookie(cookieName);
        console.log(CookieManager.listAllCookies())
        console.log("Getting cookie")
        if (cookieValue) {
          console.log("Cookie found")
          config.headers['Cookie'] = `${cookieName}=${cookieValue}`
        }

        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );
  }

  /**
   * Login function to authenticate the user
   * @param email - User's email
   * @param password - User's password
   * @returns A promise resolving to the authentication response
   */
  login(email: string, password: string) {
    return this.axios.post('/login', { email, password });
  }

  /**
   * Logout function to clear authentication data
   */
  logout() {
    localStorage.removeItem('token'); // Replace with your token management logic
  }

  /**
   * Check if the user is authenticated
   * @returns True if the user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('token'); // Replace with your logic
    return !!token;
  }

  /**
   * Save the authentication token to localStorage
   * @param token - The authentication token
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
    console.log('token', token, ' saved');
  }

  /**
   * Get the stored authentication token
   * @returns The authentication token
   */
  getToken() {
    return localStorage.getItem('token');
  }
}

export const authenticationService = new AuthenticationService(`${BASE_URL}/api`);
