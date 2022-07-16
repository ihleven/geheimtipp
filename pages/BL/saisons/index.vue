<template>
  <main class="bg-slate-100">
    <h1 class="text-lg p-2 underline underline-offset-4">BL</h1>

    <div class="border border-green-600 p-4">
      <table class="w-full table-auto border-separate">
        <tr v-for="s in saisons" :key="s.code">
          <td>{{ s.num }}</td>
          <td>
            <NuxtLink :to="`/BL/saisons/${s.season}`">{{ s.season }} </NuxtLink>
          </td>
          <td>{{ s.code }}</td>
          <td>{{ s.champs }}</td>
          <td>{{ s.nteams }}</td>
          <td>{{ s.nrounds }}</td>
          <td>{{ s.nmatches }}</td>
          <td>{{ s.ngoals }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script setup>
const response = await useAsyncData('saisons', () =>
  $fetch(`http://localhost:8000/api/compseasons/BL`)
);
const saisons = response.data.value;
console.log(saisons);
</script>
