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
        <br>
        <!-- <button @click="showAnswer(q._id)" class="button is-primary">Answer this!</button> -->
        <Answer :q="q" :index="i"/>
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
    }
  },
  methods: {
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
