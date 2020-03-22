// Service to communicate for settings endpoints
import TokenService from '../services/token-service';
import config from '../config';

const SettingsApiService = {
  // Get the user's settings
  getSettings: () => {
    return fetch(`${config.API_ENDPOINT}/settings`, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Update the user's settings
  updateSettings: (newSettings) => {
    return fetch(`${config.API_ENDPOINT}/settings`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newSettings)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
};

export default SettingsApiService;