<template>
  <main class="bg-gray-100 p-8">
    <h1>BL {{ saison.code }}</h1>

    <pre class="bg-white text-sm">{{ saison.season }}</pre>
    <table class="border-collapse border border-slate-400">
      <tr v-for="t in saison.teams" :key="t.id" class="border border-slate-300">
        <td>{{ t.performance.pos }}.</td>
        <td>{{ t.logo }}</td>
        <td>{{ t.code }}</td>
        <td>{{ t.draw }}</td>
        <td>{{ t.performance.pld }}</td>
        <td>{{ t.performance.w }}</td>
        <td>{{ t.performance.d }}</td>
        <td>{{ t.performance.l }}</td>
        <td class="font-semibold text-center">
          {{ t.performance.gf }}:{{ t.performance.ga }}
        </td>
        <td class="text-right px-2">
          <span v-if="t.performance.gd >= 0">+</span>{{ t.performance.gd }}
        </td>
        <td class="font-bold text-center">
          {{ t.performance.pts
          }}<span v-if="saison['2pkt']">:{{ t.performance.mp }}</span>
        </td>
        <td>{{ t.performance.deduction }}</td>
        <td>{{ t.performance.comment }}</td>
        <td>{{ t.appearance }}</td>
      </tr>
    </table>
  </main>
</template>

<script setup>
const route = useRoute();

const response = await useAsyncData('saison', () =>
  $fetch(`http://localhost:8000/api/compseasons/BL/${route.params.saison}`)
);
const saison = response.data.value;
</script>
