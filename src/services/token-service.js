// Helper file to manage authentication tokens for the user
import config from 'config';

const TokenService = {
  // Save the user's authenticated token
  saveAuthToken: (token) => {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  // Retrieve the saved authentication token
  getAuthToken: () => {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  // Remove the authentication token
  clearAuthToken: () => {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  // Boolean response if the user has an authentication token
  hasAuthToken: () => {
    return !!TokenService.getAuthToken()
  },
  // Create a basic authentication token for the user
  makeBasicAuthToken: (userName, password) => {
    return window.btoa(`${userName}:${password}`)
  }
}

export default TokenService;
