<template>
  <h1>Article App</h1>

  <RouterLink :to="{name: 'CreateView'}">[새 글 작성]</RouterLink>

  <!-- View 컴포넌트가 보일 위치 -->
  <RouterView />
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'

</script>

<style scoped></style>
