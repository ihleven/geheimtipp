import { setCookie } from 'h3';

export default defineEventHandler(async (event) => {

    const round = await $fetch(
        `http://localhost:8000/api/aktuell`,
        {
            headers: { Cookie: `token=${token}` }
        }
    );
    // if (document.results && document.results.length > 0) {
    //   return document.results[0].data
    // }
    return round;
});
