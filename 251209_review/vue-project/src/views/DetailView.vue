<template>
  <div v-if="article">
    <p>글 번호: {{ article.id }}</p>
    <p>글 제목: {{ article.title }}</p>
    <p>글 내용: {{ article.content }}</p>
    <p>글 작성: {{ article.created_at }}</p>
    <p>글 수정: {{ article.updated_at }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

// route.params.id를 위해 route 객체 가져오기
import { useRoute } from 'vue-router'
const route = useRoute()

// 서버에서 받은 article 정보 저장할 변수
const article = ref(null)

onMounted(() => {
  // 서버에서 해당 글 정보를 가져오는 요청 보내기
  axios({
    url: `http://127.0.0.1:8000/api/v1/articles/${route.params.id}/`,
    method: 'get',
  })
  .then(res => {
    console.log(res.data)
    article.value =  res.data
  })
  .catch(err => console.log(err))
})
</script>

<style scoped>

</style>