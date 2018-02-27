<template>
  <div class="profile">
    <Navbar :navigate="'/'"/>
    <br>
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
        </div>
        <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <div style="margin-left:10%" class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="https://media.giphy.com/media/EPZHqS9ajh2hO/giphy.gif" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{ email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div v-for="(q, i) in questions" :key="q._id">
            <profile-question :q="q" @questionUpdating="questionUpdating" @questionDeleting="questionDeleting"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
import ProfileQuestion from './ProfileQuestion'

export default {
  name: 'profile',
  components: {
    Navbar,
    ProfileQuestion
  },
  data () {
    return {
      email: '',
      questions: []
    }
  },
  methods: {
    getUserInfo () {
      let self = this
      self.$axios.get('users/profile', {
        headers: { token: self.$store.getters.getToken }
      })
        .then(({data}) => {
          self.email = data.userProfile.email
        })
        .catch(err => console.log(err))
    },
    getUserQuestions () {
      let self = this
      self.$axios.get('questions/profile', {
        headers: { token: self.$store.getters.getToken }
      })
        .then(({data}) => {
          self.questions = data.questions
        })
        .catch(err => console.log(err))
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('setToken', localStorage.getItem('token'))
        this.$router.push('/profile')
      }
    },
    questionUpdating (val) {
      let index = this.questions.findIndex(q => {
        return q._id === val._id
      })
      this.questions.splice(index, 1, val)
    },
    questionDeleting (val) {
      console.log(this.questions, 'ini questions')
      let index = this.questions.findIndex(q => {
        return q._id === val._id
      })
      console.log(val, 'val')
      console.log(index, 'index')
      this.questions.splice(index, 1)
    }
  },
  created () {
    this.checkLogin()
    this.getUserInfo()
    this.getUserQuestions()
  },
  computed: {
  }
}
</script>

<style scoped>
</style>
