import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    questions: null,
    isLogin: false
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    },
    setLogin (state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    setToken ({ commit }, payload) {
      commit('setToken', payload)
    },
    setQuestions ({ commit }, payload) {
      commit('setQuestions', payload)
    },
    setLogin ({ commit }, payload) {
      commit('setLogin', payload)
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getQuestions (state) {
      if (state.questions) {
        return state.questions.reverse()
      }
    }
  }
})
