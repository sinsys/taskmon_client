// Service to communicate for tasks endpoints
import TokenService from '../services/token-service';
import config from '../config';

const TasksApiService = {
  // Get all existing tasks for the user
  getTasks: () => {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
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
  // Get a specific task for the user
  getTask: (task_id) => {
    return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
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
  // Update the task
  updateTask: (task_id, updatedTask) => {
    return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updatedTask)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Ad a task for the user
  addTask: (newTask) => {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newTask)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Delete a task for the user
  deleteTask: (task_id) => {
    return fetch(`${config.API_ENDPOINT}/tasks/${task_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : ""
      )
  }
}

export default TasksApiService;
