<template>
  <div class="hello">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo-white.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>
        <div class="navbar-burger burger" data-target="navMenuColordark-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenuColordark-example" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a class="button is-link is-inverted">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <br>
    <div class="container">
      <div class="columns">
        <div class="column">
          <span @click="showQuestionForm" class="button is-info is-large is-rounded">Questions</span>
          <hr>
          <div v-if="showQuest" class="field">
            <div class="control">
              <textarea v-model="questionInput" class="textarea" placeholder="What's your question?"></textarea>
            </div>
            <br>
            <button @click="createQuestion" class="button is-danger is-rounded">Ask!</button>
          </div>
          <div>
            <Question/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from './Question.vue'

export default {
  name: 'hello',
  components: {
    Question
  },
  data () {
    return {
      showQuest: false,
      questionInput: ''
    }
  },
  methods: {
    getAllQuestions () {
      let self = this
      this.$axios.get('questions')
        .then(({data}) => {
          self.$store.dispatch('setQuestions', data.questions)
        })
        .catch(err => console.log(err))
    },
    showQuestionForm () {
      this.showQuest = !this.showQuest
    },
    createQuestion () {
      let self = this
      this.$axios.post('questions/add', {
        question: self.questionInput
      }, {
        headers: { token: self.$store.getters.getToken }
      })
        .then(({data}) => {
          let questionC = self.questions
          questionC.push(data.questionCreate)
          self.$store.dispatch('setQuestions', questionC)
          self.$swal('your question has been posted!', {
            icon: 'success'
          })
          self.questionInput = ''
          self.showQuest = false
        })
        .catch(err => {
          console.log(err)
          self.$swal('you must login first!', {
            icon: 'warning'
          })
          self.$router.push('/login')
        })
    }
  },
  created () {
    this.getAllQuestions()
  },
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
