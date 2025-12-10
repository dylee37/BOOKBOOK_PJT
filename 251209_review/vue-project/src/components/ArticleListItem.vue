<template>
  <div>
    <p>글 번호: {{ article.id }}</p>
    <p>글 제목: {{ article.title }}</p>
    <RouterLink :to="{name: 'DetailView', params: { id: article.id }}">
      [상세보기]
    </RouterLink>
    <hr>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  article: Object
})
</script>

<style scoped>

</style>