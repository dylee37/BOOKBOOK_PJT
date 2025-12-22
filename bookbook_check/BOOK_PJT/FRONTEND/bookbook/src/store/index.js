// src/store/index.js (Vue 3 / Vuex 4 표준)

import { createStore } from 'vuex' // ⭐️ createStore 임포트 ⭐️
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api'

// ⭐️ Vuex Store 생성 (createStore 사용) ⭐️
export default createStore({
  state: {
    // 1. 베스트셀러 20권
    bestsellers: [],
    // 2. 맞춤 추천 2권
    personalizedRecommendations: [],
    // 사용자 인증 상태 (토큰 유무로 판단)
    accessToken: localStorage.getItem('authToken') || null,
    userInfo: JSON.parse(localStorage.getItem('user_info')) || null, // 사용자 정보
    // ⭐️ 3. 사용자 선택 TTS 목소리 ⭐️
    selectedVoice: localStorage.getItem('selected_voice') || 'alloy',
    myLibrary: [],
  },
  
  getters: {
    isLoggedIn: state => !!state.accessToken,
    bestsellers: state => state.bestsellers,
    personalizedRecommendations: state => state.personalizedRecommendations,
    currentUser: state => state.userInfo,
    // ⭐️ 선택된 목소리 getter 추가 ⭐️
    selectedVoice: state => state.selectedVoice,
  },

  mutations: {
    // 데이터 저장
    SET_BESTSELLERS(state, books) {
      state.bestsellers = books
    },
    SET_PERSONALIZED_RECOMMENDATIONS(state, books) {
      state.personalizedRecommendations = books
    },
    // 인증 상태 관리
    SET_AUTH_TOKENS(state, { access, refresh }) {
      state.accessToken = access
      localStorage.setItem('authToken', access)
      localStorage.setItem('refresh_token', refresh)
    },
    SET_USER_INFO(state, user) {
      state.userInfo = user
      localStorage.setItem('user_info', JSON.stringify(user))
      // ⭐️ 사용자 정보 설정 시 목소리 설정도 함께 업데이트 ⭐️
      if (user && user.selected_voice) {
        state.selectedVoice = user.selected_voice
        localStorage.setItem('selected_voice', user.selected_voice)
      }
    },
    LOGOUT(state) {
      state.accessToken = null
      state.userInfo = null
      state.selectedVoice = 'alloy' // ⭐️ 로그아웃 시 기본값으로 ⭐️
      localStorage.removeItem('authToken')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user_info')
      localStorage.removeItem('selected_voice') // ⭐️ 로컬 스토리지에서도 삭제 ⭐️
      state.personalizedRecommendations = []
    },
    // ⭐️ 목소리 설정 변경 뮤테이션 ⭐️
    SET_SELECTED_VOICE(state, voiceId) {
      state.selectedVoice = voiceId
      localStorage.setItem('selected_voice', voiceId)
    },
    SET_MY_LIBRARY(state, books) {
    state.myLibrary = books;
    }, 
  },

  actions: {
    // 1. 베스트셀러 20권 목록 가져오기 (공통)
    async fetchBestsellers({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/books/bestsellers/`)
        commit('SET_BESTSELLERS', response.data)
      } catch (error) {
        console.error('Error fetching bestsellers:', error)
      }
    },


    // 2. 사용자 맞춤 추천 2권 가져오기 (인증 필요)
    async fetchPersonalizedRecommendations({ commit, state }) {
      if (state.personalizedRecommendations.length > 0) {
        return;
      }
      try {
        // 1. state뿐만 아니라 localStorage에서도 직접 확인 (안전장치)
        const token = state.accessToken || localStorage.getItem('authToken')
        
        const config = {}
        if (token) {
          config.headers = {
            'Authorization': `Token ${token}`
          }
        }

        const response = await axios.get(`${API_URL}/books/main-recommendations/`, config)
        commit('SET_PERSONALIZED_RECOMMENDATIONS', response.data)
      } catch (error) {
        console.error('Error fetching recommendations:', error)
        commit('SET_PERSONALIZED_RECOMMENDATIONS', [])
      }
    },
    async fetchMyLibrary({ commit, state }) {
      try {
        const token = state.accessToken || localStorage.getItem('authToken');
        console.log("보내는 토큰:", token); // 1. 토큰 확인
        
        if (!token) {
          console.error("토큰이 없습니다!");
          return;
        }

        // 💡 주소 뒤에 슬래시(/)가 빠지면 Django에서 에러가 날 수 있습니다.
        const response = await axios.get(`${API_URL}/v1/user/library/`, {
          headers: {
            // ⭐️ 'Token' 뒤에 한 칸 띄우고 토큰값이 와야 합니다.
            Authorization: `Token ${token}` 
          }
        });
        
        console.log("서버 응답 데이터:", response.data); // 2. 데이터 확인
        commit('SET_MY_LIBRARY', response.data);
      } catch (error) {
        console.error("서재 목록 fetch 중 에러:", error.response || error); // 3. 에러 상세 확인
      }
    },
    async fetchUserInfo({ commit, state }) {
    try {
      const token = state.accessToken || localStorage.getItem('authToken');
      if (!token) return;

      const response = await axios.get('http://127.0.0.1:8000/api/v1/user/me/', {
        headers: {
          Authorization: `Token ${token}`
        }
      });

      console.log("최신 유저 정보 업데이트:", response.data);
      // SET_USER_INFO 뮤테이션이 이미 있다면 그대로 사용하면 됩니다.
      commit('SET_USER_INFO', response.data);
      } catch (error) {
        console.error("유저 정보 업데이트 실패:", error);
      }
    },
  },
  modules: {}
})