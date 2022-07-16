export default defineEventHandler(async (event) => {
  // const query = useQuery(event)
  // const { comp, season, token } = query

  // const token = useCookie(event.req, 'token')

  // const token = useCookie('token')
  console.log(' *** url *** =>', event.req.url);

  const round = await $fetch(`http://localhost:8000${event.req.url}`);

  return round;
});
