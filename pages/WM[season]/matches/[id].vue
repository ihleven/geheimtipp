<template>
  <main>
    <section class="container bg-white">
      <div class="[grid-area:header] bg-white">odds: {{ match.id }}</div>

      <div class="[grid-area:main] bg-red-100">main</div>
      <div
        class="[grid-area:heim] bg-white text-gray-700 text-xl font-semibold text-right"
      >
        {{ match.teams[0] }}
      </div>
      <div class="[grid-area:result] text-center">{{ match.result }}</div>
      <div
        class="[grid-area:gast] bg-white text-gray-700 text-xl font-semibold"
      >
        {{ match.teams[1] }}
      </div>
      <div class="[grid-area:footer] bg-green-100">footer</div>
      <button
        class="[grid-area:prev] ml-1 z-1 bg-white rounded py-2 flex items-center border border-transparent active:border-blue-300"
      >
        <ChevronLeftIcon class="h-8 w-8" /> prev
      </button>
      <button
        class="[grid-area:next] mr-0.5 rounded bg-white py-2 flex items-center justify-end active:ring-2 active:ring-blue-300"
      >
        next <ChevronRightIcon class="h-8 w-8" />
      </button>
    </section>
    <section>
      <ul class="bg-white border-y border-gray-400 divide-y divide-gray-300">
        <li
          v-for="tipp in match.odds.tipps"
          :key="tipp.login"
          class="flex items-center justify-between"
        >
          {{ tipp.login }} {{ tipp.ht }}:{{ tipp.at }} - {{ tipp.Punkte }}Pkt.

          <button
            class="flex items-center pl-2 py-2 text-sm text-blue-500 hover:text-white bg-black/30"
          >
            zum Spiel
            <ChevronRightIcon class="h-6 w-6" />
          </button>
        </li>
        <li>FRA - BVB</li>
      </ul>
    </section>
  </main>
</template>

<script setup>
const route = useRoute();
const id = parseInt(route.params.season) * 100 + parseInt(route.params.id);
console.log(route.params, id);
const { data } = await useFetch(`http://localhost:8000/api/matches/${id}`);
const match = JSON.parse(data.value);
</script>

<script>
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/solid/index.js';

export default {
  components: { ChevronLeftIcon, ChevronRightIcon }
};
</script>
<style>
.container {
  display: grid;
  grid-template-areas:
    'header header header header header'
    'prev main main main next'
    'heim heim result gast gast'
    'footer footer footer footer footer';
}
</style>
