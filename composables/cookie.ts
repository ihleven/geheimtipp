export const fetchWithCookie = async (url: string, cookieName: string) => {
  const cookie = useCookie(cookieName);
  const response = await $fetch.raw(url);
  if (process.server) {
    const cookies = Object.fromEntries(
      response.headers
        .get('set-cookie')
        ?.split(',')
        .map((a) => a.split('='))
    );
    if (cookieName in cookies) {
      cookie.value = cookies[cookieName];
    }
  }
  return response._data;
};
