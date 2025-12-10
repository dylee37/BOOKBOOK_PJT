<template>
  <div>
    <h3>게시글 작성</h3>

    <form @submit.prevent="createArticle">
      <div>
        <label for="title">제목: </label>
        <input type="text" id="title" v-model.trim="title">
      </div>
      <div>
        <label for="content">내용: </label>
        <textarea id="content" v-model.trim="content"></textarea>
      </div>
      <input type="submit" value="제출">
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const content = ref('')

const createArticle = function () {
  console.log(title.value, content.value)
  axios({
    url: 'http://127.0.0.1:8000/api/v1/articles/',
    method: 'post',
    data: {
      title: title.value,
      content: content.value,
    }
  })
  .then(res => {
    console.log(res.data)
    // 작성 이후 어디로 보낼지 여기서 결정
    router.push({ name: 'ArticleView' })
  })
  .catch(err => console.log(err))
}
</script>

<style scoped>

</style>