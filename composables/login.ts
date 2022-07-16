export const useLogin = async (username: string, password: string) => {
  const response = await $fetch.raw('/api/login', {
    method: 'POST',
    body: new URLSearchParams({ username, password })
  });
  // if (process.server) {
  const cookies = Object.fromEntries(
    response.headers
      .get('set-cookie')
      ?.split(',')
      .map((a) => a.split('='))
  );
  if ('token' in cookies) {
    useCookie('token').value = cookies['token'];
  }
  // }
  return response._data;
};
