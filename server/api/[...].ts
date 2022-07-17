export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig();

    const response = await $fetch(`${config.API_BASE_URL}${event.req.url}`, {
        headers: {
            Cookie: event.req.headers.Cookie
        }
    });

    return response
});
