import { useCookie } from 'h3';

export default defineEventHandler(async (event) => {
  const query = useQuery(event);
  const { saison, spieltag, token } = query;

  // const token = useCookie(event.req, 'token')

  // const token = useCookie('token')
  console.log('cookie token =>', token);

  // const qTypes = {
  //   id: 'document.id',
  //   page: 'my.page.uid',
  //   single: 'document.type',
  // }
  // const { access_token, endpoint } = import.meta.env
  // let params = { foo: 'bar' }

  // const prismicRef = await $fetch(`http://localhost:8000/api/comprounds/BL/${saison}/${spieltag}`, { params })
  // params.ref = prismicRef.refs[0].ref
  // params.q = `[[at(${qTypes[type] || 'document.id'}, "${uid}")]]`
  const round = await $fetch(
    `http://localhost:8000/api/comprounds/BL/${saison}/${spieltag}`,
    {
      headers: { Cookie: `token=${token}` }
    }
  );
  // if (document.results && document.results.length > 0) {
  //   return document.results[0].data
  // }
  return round;
});
