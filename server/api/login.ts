import { useBody, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = new URLSearchParams(body);

  const response = await $fetch.raw(`http://localhost:8000/api/login`, {
    method: 'POST',
    body: params
  });
  // const cookies = Object.fromEntries(
  //     response.headers.get('set-cookie')?.split(',').map((a) => a.split('='))
  // )

  // if ('token' in cookies) {
  //     console.log("token cookie:", cookies['token'])
  //     setCookie(event.res, 'token', cookies['token'], {httpOnly: false});
  // }

  // const data = JSON.parse(response._data)
  console.log('data:', response._data);
  setCookie(event.res, 'token', response._data.JWT, { httpOnly: false });

  return { ght: response._data };
});
