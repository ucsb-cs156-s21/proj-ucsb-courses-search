import unfetch from "isomorphic-unfetch";

export async function fetch(url, options) {
  const response = await unfetch(url, options);
  if (options.noJSON) {
    return response;
  }
  return response.json();
}

export async function fetchWithToken(url, token, options) {
  return fetch(new URL(url, process.env.BACKEND_DOMAIN), {
    ...options,
    headers: {
      ...options?.headers,
      authorization: `Bearer ${token}`
    }
  });
}
