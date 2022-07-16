<template>
  <main>
    <table class="text-sm table-auto">
      <tbody>
        <tr
          v-for="a in avatars"
          :key="a.id"
          class="odd:bg-white even:bg-gray-200 divide-y divide-gray-300"
        >
          <td class="">
            <img
              class="max-w-none h-16 w-16 rounded-sm shadow-lg active:shadow"
              :src="`http://localhost:8000/media/avatars/${a.id}/64`"
            />
          </td>
          <td>{{ a.id }}</td>
          <td>{{ a.aid }}</td>
          <td>{{ a.ght }}</td>
          <td>{{ a.name }}<br />{{ a.file }}</td>
          <td>{{ a.size }}</td>
          <td>{{ a.mimetype }}<br />{{ a.format }}, {{ a.mode }}</td>

          <td>{{ a.w }}x{{ a.h }}</td>
          <td></td>
          <td>{{ a.labels }}</td>
          <td>{{ a.topic }}</td>
          <td>{{ a.p }}</td>
          <td>{{ a.active }}</td>
          <td>{{ a.created }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
const { data, pending, error, refresh } = await useFetch(
  `http://localhost:8000/api/avatars`
);
const avatars = JSON.parse(data.value);
</script>
