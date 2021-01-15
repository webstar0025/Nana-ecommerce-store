import { stringify } from 'querystring';

// api error
export class ApiError {
  constructor(code, message, body) {
    this.code = code;
    this.message = message;
    this.body = body;
  }
}
Object.setPrototypeOf(ApiError, Error);

export async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const statusCode = response.status;
  if (statusCode < 400) {
    // download csv endpoint returns content as 'text/plain' instead of 'text/csv'
    if (contentType && contentType.includes('text')) {
      return response.blob();
    }
    return response
      .json()
      .catch(() => null)
      .then((body) => body);
  }

  return response
    .json()
    .catch(() => null)
    .then((body) => {
      throw new ApiError(statusCode, response.statusText, body);
    });
}

// generic request
export function request({ path, opts = {}, rootURL = '' }) {
  return fetch(`${rootURL || process.env.REACT_APP_API}/${path}`, {
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    ...opts,
  }).then(handleResponse);
}

// get request
export function get({ path, parameters = {}, opts = {} }) {
  const search = stringify(parameters);
  return request({
    path: `${path}?${search}`,
    opts: {
      method: 'GET',
      ...opts,
    },
  });
}

// post request
export function post({ path, body = {}, opts = {} }) {
  return request({
    path,
    opts: {
      method: 'POST',
      body: JSON.stringify(body),
      ...opts,
    },
  });
}

// patch request
export function patch({ path, body = {}, opts = {} }) {
  return request({
    path,
    opts: {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...opts,
    },
  });
}

// delete request
export function del({ path, parameters = {}, opts = {} }) {
  const search = stringify(parameters);
  return request({
    path: `${path}?${search}`,
    opts: {
      method: 'DELETE',
      ...opts,
    },
  });
}
