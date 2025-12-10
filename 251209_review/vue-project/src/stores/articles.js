import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useArticlesStore = defineStore(
  'articles',
  () => {
    const articles = ref([])

    const getArticles = function () {
      // 서버에 요청해서 가져오기
      axios({
        url: 'http://127.0.0.1:8000/api/v1/articles/',
        method: 'get',
      })
        .then(res => {
          console.log(res.data)
          articles.value = res.data
        })
        .catch(err => console.log(err))
    }

    return {
      articles,
      getArticles,
    }
  },
  { persist: true }
)
