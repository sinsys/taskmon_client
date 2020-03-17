import TokenService from '../services/token-service';
import config from '../config';

const SettingsApiService = {
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