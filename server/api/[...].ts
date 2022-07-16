// export default defineEventHandler(() => `Default api handler`)



export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig();

    console.log(' *** url *** =>', event.req.url, config.API_BASE_URL);

    const response = await $fetch(`${config.API_BASE_URL}${event.req.url}`);

    return response
});
