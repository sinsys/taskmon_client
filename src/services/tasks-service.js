import TokenService from '../services/token-service';
import config from '../config';

const TasksApiService = {
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
  }
  // },
  // getArticleComments(articleId) {
  //   return fetch(`${config.API_ENDPOINT}/articles/${articleId}/comments`, {
  //     headers: {
  //       'authorization': `basic ${TokenService.getAuthToken()}`,
  //     },
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // },
  // postComment(articleId, text) {
  //   return fetch(`${config.API_ENDPOINT}/comments`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       'authorization': `basic ${TokenService.getAuthToken()}`,
  //     },
  //     body: JSON.stringify({
  //       article_id: articleId,
  //       text,
  //     }),
  //   })
  //     .then(res =>
  //       (!res.ok)
  //         ? res.json().then(e => Promise.reject(e))
  //         : res.json()
  //     )
  // }
}

export default TasksApiService;
