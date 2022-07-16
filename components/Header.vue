<template>
  <header class="bg-green-500 flex justify-between items-center p-1 bg-opacity-30 w-screen">
    <nav class="space-x-2">
      <NuxtLink to="/geheimtipp">
        <span class="font-light">geheimtipp</span>
        <!-- <span class="font-semibold ml-0.5">2022</span> -->
        <!-- <span class="text-xs text-gray-500"></span> -->
      </NuxtLink>
      <NuxtLink class="font-bold text-white underline underline-offset-2" to="/">home</NuxtLink>
      <!-- <NuxtLink class="font-bold text-white underline underline-offset-2 " to="/geheimtipp">geheimtipp</NuxtLink> -->
      <!-- <NuxtLink class="font-bold text-white underline underline-offset-2 " to="/geheimtipp/2004">2022</NuxtLink> -->
      <NuxtLink class="font-bold text-white underline underline-offset-2" to="/about">about</NuxtLink>
      <NuxtLink class="font-bold text-white underline underline-offset-2" to="/geheimtipp/tipper">Tipper</NuxtLink>
      <!-- <NuxtLink class="font-bold text-white underline underline-offset-2 " to="/geheimtipp/2004/34">BL2022/34</NuxtLink> -->
    </nav>
    <!-- <span class="fi fi-ch"></span> <span class="fi fi-ch fis"></span> -->
    <!-- <main class="py-1 px-2 flex justify-between">
        




        <button class="inline-flex items-center justify-center p-2 text-gray-900 focus:outline-none">
            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" class="block h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg> 
            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" class="hidden h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </main> -->
    <HeaderGhtMenu />
  </header>
</template>


<script>
export default {
  setup() {
    const num1 = ref(0);
    const num2 = ref(0);
    const fact = ref('');
    const sum = computed(
      () => parseInt(num1.value, 10) + parseInt(num2.value, 10)
    );

    watchEffect(async () => {
      const res = await fetch(`http://numbersapi.com/${sum.value}`);
      fact.value = await res.text();
    });

    return {
      num1,
      num2,
      sum,
      fact
    };
  }
};
</script>
