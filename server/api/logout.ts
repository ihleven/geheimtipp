import { setCookie } from 'h3';

// export default defineEventHandler(async ({ res }) => {

//     const response = await $fetch(`http://localhost:8000/api/logout`, {
//         method: 'POST'
//     });

//     setCookie(res, 'token', '', { httpOnly: false });

//     return {}
// });

export default (req, res) => {
    setCookie(res, 'token', '', { httpOnly: false });
    return { cookie: req.cookie };
};