<template>
  <div class="hello">
    <Navbar :navigate="'/profile'"/>
    <br>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div @click="showQuestionForm" class="button is-info is-large is-rounded">
            <span>Add Question</span>&nbsp;&nbsp;
            <i class="fas fa-angle-down"></i>
          </div>
          <hr>
          <div v-if="showQuest" class="field">
            <div class="control">
              <input v-model="titleInput" :class="titleClass" placeholder="What's your question ?">
              <p v-if="titleWarn" class="help is-danger">content required</p>
            </div>
            <br>
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
import Navbar from './Navbar'
import Question from './Question.vue'

export default {
  name: 'hello',
  components: {
    Question,
    Navbar
  },
  data () {
    return {
      showQuest: false,
      questionInput: '',
      titleInput: '',
      isLogin: false,
      showDown: false,
      titleClass: 'input is-danger',
      titleWarn: true
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
        title: self.titleInput,
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
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('setToken', localStorage.getItem('token'))
        this.$router.push('/')
      }
    }
  },
  created () {
    this.getAllQuestions()
    this.checkLogin()
  },
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    }
  },
  watch: {
    titleInput (value) {
      if (value.length > 0) {
        this.titleClass = 'input'
        this.titleWarn = false
      } else {
        this.titleClass = 'input is-danger'
        this.titleWarn = true
      }
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
