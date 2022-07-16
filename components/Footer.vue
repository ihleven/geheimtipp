<template>
  <footer class="bg-gray-500 flex justify-evenly py-16">
    <NuxtLink to="/geheimtipp">Geheimtipp</NuxtLink>
    <ul>
      <li v-for="(ausgabe, code) in ausgaben" :key="code">
        <NuxtLink :to="`/geheimtipp/${code}`">{{ ausgabe }}</NuxtLink>
      </li>
    </ul>
    <ul>
      <li v-for="(ausgabe, code) in turniere" :key="code">
        <NuxtLink :to="`/geheimtipp/${code}`">{{ ausgabe }}</NuxtLink>
      </li>
    </ul>
  </footer>
</template>

<script setup>
const ausgaben = {
  2004: 'Bundesliga 2003/04',
  2005: 'Bundesliga 2004/05',
  2006: 'Bundesliga 2005/06',
  2008: 'Bundesliga 2007/08',
  2009: 'Bundesliga 2008/09',
  2010: 'Bundesliga 2009/10',
  2011: 'Bundesliga 2010/11',
  2012: 'Bundesliga 2011/12',
  2013: 'Bundesliga 2012/13',
  2014: 'Bundesliga 2013/14',
  2015: 'Bundesliga 2014/15',
  2016: 'Bundesliga 2015/16',
  2017: 'Bundesliga 2016/17',
  2018: 'Bundesliga 2017/18',
  2019: 'Bundesliga 2018/19',
  2020: 'Bundesliga 2019/20',
  2021: 'Bundesliga 2020/21',
  2022: 'Bundesliga 2021/22',
  2023: 'Bundesliga 2022/23'
};
const turniere = {
  WM2010: 'WM 2010'
};
</script>
