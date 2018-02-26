<template>
  <div class="question">
    <div class="container">
      <article v-for="(q, i) in questions" :key="q._id" class="message">
        <div class="message-header">
          <p>Q:</p>
          {{q.userId.email}}
        </div>
        <div class="message-body">
          <p><a class="fas fa-thumbs-up"></a>&nbsp;<span>{{ q.votes.length }}</span>&nbsp;&nbsp;<a class="fas fa-thumbs-down"></a></p>
          <div class="message-header">
            {{ q.question }}
          </div>
        </div>
        <!-- <div class="message-footer">
          <button @click="showingAnswer(q._id)" v-if="!showAnswers" class="button is-primary is-rounded">Show all answers</button>
          <button @click="unshowingAnswer(q._id)" v-if="showAnswers" class="button is-primary is-danger">Unshow</button>
        </div> -->
        <br>
        <div>
          <article v-for="(a, i) in q.answers" class="message is-info">
            <div class="message-header">
              A:
              {{ a.userId.email }}
            </div>
            <div class="message-body">
              <p><a class="fas fa-thumbs-up"></a>&nbsp;<span>{{ q.votes.length }}</span>&nbsp;&nbsp;<a class="fas fa-thumbs-down"></a></p>
              {{ a.answer }}
            </div>
          </article>
        </div>
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
export default {
  name: 'Question',
  data () {
    return {
      answerAdd: []
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
.container {
  margin-left: 7%;
  margin-right: 7%;
}

#question-header {
  text-align: center !important;
}
</style>
