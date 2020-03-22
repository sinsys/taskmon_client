// Service to communicate for authentication endpoints
import config from '../config';

const AuthApiService = {
  // Log the user in
  postLogin: (credentials) => {
    return (
      fetch(`${config.API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
        .then(res => {
          return (
            ( !res.ok )
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          );
        })
    );
  },
  // Register a new user
  postUser: (user) => {
    return (
      fetch(`${config.API_ENDPOINT}/users`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          return (
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          );
        })
    );
  }
};

export default AuthApiService;