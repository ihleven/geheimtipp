<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Header />
    <NuxtPage />
    <Footer class="mt-auto" />
  </div>
</template>

<!-- 
<script setup lang="ts">

const headers = useRequestHeaders(['cookie'])
console.log("headers", headers)

// We're getting the result - no cookies will be passed on initial render
// because the cookie is set on the resopnse to this fetch only, not
// on the response to the client.
const result = await $fetch("/api/with-cookie");
console.log("result", result)

// Here we're using a composable that automatically passes on a cookie of our choice.
const result2 = await fetchWithCookie("/api/with-cookie", "token");
console.log("result2", result2)
onMounted(() => console.log(document.cookie));
</script> -->
<script setup>
// import './tailwind.config.css'
const router = useRouter();
if (process.server) {
  const token = useCookie('token').value;
  if (token) {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString()
    );
    const ght = useState('ght', () => payload.Username);

    const response = await $fetch(`/api/aktuell`, { parseResponse: JSON.parse, credentials: 'include', headers: { cookie: `token=${token}` } });
    useState('aktuell', () => response);
    useState('login', () => response.ght);
    useState('registration', () => response.registration);
  } else {
    router.push({ path: "/login" });
  }
}
</script>
