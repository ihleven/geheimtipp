<template>
  <div :class="classes">{{ result }}</div>
</template>

<script>
export default {
  props: {
    tipp: Object
  },
  computed: {
    result() {
      return this.tipp ? `${this.tipp.ht}:${this.tipp.at}` : '-:-';
    },
    classes() {
      if (!this.tipp) return 'text-slate-300';
      return this.tipp.Punkte === 2
        ? 'text-blue-700 font-bold border-r-4 border-blue-700 border-double'
        : this.tipp.Punkte === 1
        ? 'text-blue-600'
        : this.tipp.Punkte === 0
        ? 'text-slate-400 font-light'
        : 'text-blue-500';
    }
  }
};
</script>
