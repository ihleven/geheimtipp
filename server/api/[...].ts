import { useBody } from 'h3';

export default defineEventHandler(async (event) => {
    const cookie = event.req.headers.cookie
    // const Cookie = event.req.headers.Cookie
    console.log(" +++ API +++", event.req.url, ' => ', cookie)

    const options = {
        headers: {
            Cookie: cookie
        }
    }
    if (['PUT', 'POST'].includes(event.req.method)) {
        options.method = event.req.method
        try {
            const body = await useBody(event)
            options.body = new URLSearchParams(body)
        } catch (e) {
            console.log("fallback handler", e)
        }
    }


    const config = useRuntimeConfig();
    console.log("API call:", event.req.url, options)
    const response = await $fetch(`${config.API_BASE_URL}${event.req.url}`, options);

    return response
});
