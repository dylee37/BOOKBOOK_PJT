<template>
  <div>
    <ArticleListItem
      v-for="article in store.articles"
      :key="article.id"
      :article="article" />
  </div>
</template>

<script setup>
import ArticleListItem from './ArticleListItem.vue';
import { useArticlesStore } from '@/stores/articles';
const store = useArticlesStore()
</script>

<style scoped>

</style>