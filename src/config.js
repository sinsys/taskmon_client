export default {
  TOKEN_KEY: process.env.REACT_APP_TOKEN_KEY || 'blogful-client-auth-token',
  API_BASE_URL: process.env.REACT_APP_API_ENDPOINT ||
  "http://localhost:8000/api"
}