<template>
  <div class="question">
    <div>
      <article v-for="(q, i) in questions" :key="q._id" class="message">
        <div class="message-header">
          <p>Q:</p>
          {{q.userId.email}}
        </div>
        <div class="message-body">
          <!-- <button class="button is-primary is-rounded" @click="setThumbs">asdas</button> -->
          <span @click="setThumbs(q, true)">
            <i class="fas fa-thumbs-up"></i>
          </span>
          &nbsp;
          <span>{{ q.point }}</span>
          &nbsp;&nbsp;
          <span @click="setThumbs(q, false)">
            <i class="fas fa-thumbs-down"></i>
          </span>
          <div class="message-header">
            {{ q.title }}
          </div>
          <div class="message-body">
            {{ q.question }}
          </div>
        </div>
        <!-- <div class="message-footer">
          <button @click="showingAnswer(q._id)" v-if="!showAnswers" class="button is-primary is-rounded">Show all answers</button>
          <button @click="unshowingAnswer(q._id)" v-if="showAnswers" class="button is-primary is-danger">Unshow</button>
        </div> -->
        <button v-if="q._id !== questId" @click="showAnswer(q._id)" class="button is-primary">Show Answers</button>
        <button v-if="q._id === questId" @click="showAnswer(q._id)" class="button is-primary">Hide Answers</button>
        <br>
        <Answer v-show="q._id === questId" :q="q"/>
        <br>
        <div class="answer">
          <div class="field">
            <div class="control">
              <textarea v-model="answerAdd[i]" class="textarea" placeholder="Write your answer here.."></textarea>
            </div>
            <br>
            <button @click="answerCreate(q._id, i)" class="button is-success is-rounded">Answer!</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import Answer from './Answer.vue'

export default {
  name: 'Question',
  components: {
    Answer
  },
  data () {
    return {
      answerAdd: [],
      questId: ''
    }
  },
  methods: {
    answerCreate (questionId, i) {
      let self = this
      this.$axios.post(`answers/${questionId}`, {
        answer: self.answerAdd[i]
      }, {
        headers: { token: self.$store.getters.getToken }
      })
        .then(({data}) => {
          let questionUpdate = self.questions
          // console.log(data)
          questionUpdate.forEach((q, i) => {
            if (q._id === questionId) {
              questionUpdate[i].answers.push(data.answerCreate)
            }
          })
          self.answerAdd = []
          self.$store.dispatch('setQuestions', questionUpdate)
          self.$swal('you have answer this questions!', {
            icon: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          self.$swal('you must login first to answer!', {
            icon: 'warning'
          })
          self.answerAdd = []
          self.$router.push('/login')
        })
    },
    setThumbs (question, isThumb) {
      let self = this
      this.$axios.put(`questions/vote/${question._id}`, {
        thumbsUp: isThumb
      }, {
        headers: { token: self.$store.state.token }
      })
        .then(({data}) => {
          self.$swal(`success to vote this answer!`, {
            icon: 'success'
          })
          let updateQuestions = self.questions
          updateQuestions.reverse()
          let indexQuestion = updateQuestions.findIndex(q => {
            return q._id === question._id
          })
          if (isThumb) {
            updateQuestions[indexQuestion].point += 1
          } else {
            updateQuestions[indexQuestion].point -= 1
          }
          self.$store.dispatch('setQuestions', updateQuestions)
        })
        .catch(err => {
          self.$swal(`you've already vote this question`, {
            icon: 'warning'
          })
          console.log(err)
        })
    },
    showAnswer (questionId) {
      if (this.questId === questionId) {
        this.questId = ''
      } else {
        this.questId = questionId
      }
    }
  },
  created () {
  },
  computed: {
    questions () {
      return this.$store.getters.getQuestions
    }
  }
}
</script>

<style scoped>
#question-header {
  text-align: center !important;
}
</style>
