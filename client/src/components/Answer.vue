<template>
  <div class="answer">
    <article v-for="(a, i) in q.answers" class="message is-info">
      <div class="message-header">
        A:
        {{ a.userId.email }}
      </div>
      <div class="message-body">
        <span @click="setThumbs(q, a, true)">
          <i class="fas fa-thumbs-up"></i>
        </span>
        &nbsp;
        <span>{{ a.point }}</span>
        &nbsp;&nbsp;
        <span @click="setThumbs(q, a, false)">
          <i class="fas fa-thumbs-down"></i>
        </span>
        <br><br>
        {{ a.answer }}
      </div>
    </article>
    <button @click="showAnswer(q._id)" class="button is-primary">Answer this!</button>
    <div v-show="q._id === questId" class="answer">
      <div class="field">
        <div class="control">
          <textarea v-model="answerAdd[index]" class="textarea" placeholder="Write your answer here.."></textarea>
        </div>
        <br>
        <button @click="answerCreate(q._id, index)" class="button is-success is-rounded">Answer!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'answer',
  props: [
    'q',
    'index'
  ],
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
    setThumbs (question, answer, isThumb) {
      let self = this
      this.$axios.put(`answers/${question._id}/${answer._id}`, {
        thumbsUp: isThumb
      }, {
        headers: { token: self.$store.state.token }
      })
        .then(({data}) => {
          console.log(data)
          self.$swal(`success to vote this answer!`, {
            icon: 'success'
          })
          let updateQuestions = self.questions
          updateQuestions.reverse()
          let indexQuestion = updateQuestions.findIndex(q => {
            return q._id === question._id
          })
          let indexAnswer = question.answers.findIndex(a => {
            return a._id === answer._id
          })
          if (isThumb) {
            updateQuestions[indexQuestion].answers[indexAnswer].point += 1
          } else {
            updateQuestions[indexQuestion].answers[indexAnswer].point -= 1
          }
          self.$store.dispatch('setQuestions', updateQuestions)
        })
        .catch(err => {
          self.$swal(`you've already vote this answer`, {
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
</style>
