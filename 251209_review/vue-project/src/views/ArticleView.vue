<template>
  <div>

    <h3>게시글 목록</h3>

    <ArticleList />
  </div>
</template>

<script setup>
import { useArticlesStore } from '@/stores/articles';
import { onMounted } from 'vue';
import ArticleList from '@/components/ArticleList.vue';

const store = useArticlesStore()

onMounted(() => {
  store.getArticles()
})
</script>

<style scoped>

</style>