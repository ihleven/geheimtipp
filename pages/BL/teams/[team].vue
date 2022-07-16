<template>
  <main class="bg-gray-100 p-8">
    <NuxtLink to="/BL/FCB">FCB</NuxtLink>
    <NuxtLink to="/BL/SCF">SCF</NuxtLink>
    <h1>BL {{ club }}</h1>

    <pre class="bg-white text-sm">{{ club }}</pre>
  </main>
</template>

<script setup>
const route = useRoute();

const team = route.params.club;

const response = await useAsyncData('club', () =>
  $fetch(`http://localhost:8000/api/compseasons/BL/${route.params.club}/teams`)
);
const club = JSON.parse(response.data.value);
console.log(' * club =>', route.params.team, response.data.value);
</script>
