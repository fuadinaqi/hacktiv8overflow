<template>
  <div class="">
    <navbar :navigate="'/profile'"/>
    <br>
    <div class="container">
      <div @click="back" class="tag is-danger is-rounded is-medium">
        Back
      </div>
      <br>
      <br>
      <div class="tag is-success is-rounded is-medium">
        Question
      </div>
      <br>
      <br>
      <div class="message-header" style="background-color:orange">
        <p style="color:white">{{ question.title }}</p>
      </div>
      <div class="message-body" style="background-color:white">
        <p style="color:grey">{{ question.question }}</p>
      </div>
      <hr>
      <div class="tag is-success is-rounded is-small">
        Answers
      </div>
      <br><br>
      <div v-for="(a, i) in answers" :key="a._id" class="notification is-white">
        <div class="message-header" style="background-color:green">
          <span>{{ a.userId.email }}</span>
        </div>
        <br>
        {{ a.answer }}
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      answers: [],
      question: ''
    }
  },
  methods: {
    getAnswersByParams () {
      let self = this
      let arr = this.dataQuestions.filter(q => {
        return q._id === self.$route.params.id
      })
      this.answers = arr[0].answers
      this.question = arr[0]
    },
    getAllQuestions () {
      let self = this
      this.$axios.get('questions')
        .then(({data}) => {
          self.$store.dispatch('setQuestions', data.questions)
          this.getAnswersByParams()
        })
        .catch(err => console.log(err))
    },
    back () {
      this.$router.push('/profile')
    }
  },
  created () {
    this.getAllQuestions()
  },
  computed: {
    dataQuestions () {
      return this.$store.getters.getQuestions
    }
  }
}
</script>

<style lang="css">
</style>
