// Service to communicate for projects endpoints
import TokenService from '../services/token-service';
import config from '../config';

const ProjectsApiService = {
  // Get all existing projects for the user
  getProjects: () => {
    return fetch(`${config.API_ENDPOINT}/projects`, {
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
  // Get a specific project for the user
  getProject: (project_id) => {
    return fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
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
  // Update the project
  updateProject: (project_id, updatedProject) => {
    return fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updatedProject)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Add a new project for the user
  addProject: (newProject) => {
    return fetch(`${config.API_ENDPOINT}/projects`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(newProject)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  // Delete a project for the user
  deleteProject: (project_id) => {
    return fetch(`${config.API_ENDPOINT}/projects/${project_id}`, {
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
export default ProjectsApiService;
