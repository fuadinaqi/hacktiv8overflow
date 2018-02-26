import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    questions: null
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setQuestions (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    setToken ({ commit }, payload) {
      commit('setToken', payload)
    },
    setQuestions ({ commit }, payload) {
      commit('setQuestions', payload)
    }
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getQuestions (state) {
      return state.questions
    }
  }
})
