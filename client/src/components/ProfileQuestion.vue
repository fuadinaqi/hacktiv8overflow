<template>
  <article class="media">
    <figure class="media-left">
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <div class="message-header">
            {{ q.title }}
          </div>
          <br>
          {{ q.question }}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a @click="showingEdit(q._id)" class="level-item">
            <span class="icon is-small"><i class="fas fa-edit"></i></span>
          </a>
          <a @click="deleteQuestion(q._id)" class="level-item">
            <span class="icon is-small"><i class="fas fa-trash"></i></span>
          </a>
          <a class="level-item">
            <router-link class="button is-info is-small" :to="{ path: `/profile/${q._id}`, params: {id: q._id} }">Show Answers</router-link>
          </a>
        </div>
      </nav>
      <div v-show="showEdit.id === q._id" class="field">
        <div class="control">
          <input v-model="titleInput" :class="titleClass" placeholder="What's your question ?">
          <p v-if="titleWarn" class="help is-danger">content required</p>
        </div>
        <br>
        <div class="control">
          <textarea v-model="questionInput" class="textarea" placeholder="Detail Question.."></textarea>
        </div>
        <br>
        <button @click="editQuestion(q._id)" class="button is-danger is-rounded">Edit!</button>
      </div>
    </div>
    <div class="media-right">
    </div>
  </article>
</template>

<script>
export default {
  name: 'profile-question',
  props: [
    'q'
  ],
  data () {
    return {
      titleInput: '',
      questionInput: '',
      titleClass: 'input is-danger',
      titleWarn: true,
      showEdit: {
        id: ''
      }
    }
  },
  methods: {
    editQuestion (questionId) {
      let self = this
      self.$swal({
        title: 'Are you sure to edit this question?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willEdit => {
          if (willEdit) {
            this.$axios.put(`questions/${questionId}`, {
              title: self.titleInput,
              question: self.questionInput
            }, {
              headers: { token: localStorage.getItem('token') }
            })
              .then(({data}) => {
                // console.log(self.$store.state.questions)
                // let questions = self.$store.state.questions
                // let index = questions.findIndex(quest => {
                //   return quest._id === questionId
                // })
                // questions.splice(index, 1, data.questionEdited)
                // self.$store.dispatch('setQuestions', questions)
                self.$emit('questionUpdating', data.questionEdited)
                self.$swal('your question have been updated!', {
                  icon: 'success'
                })
              })
              .catch(err => console.log(err))
          }
        })
    },
    deleteQuestion (questionId) {
      let self = this
      self.$swal({
        title: 'Are you sure to delete this question?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            this.$axios.delete(`questions/${questionId}`, {
              headers: { token: localStorage.getItem('token') }
            })
              .then(({data}) => {
                console.log(data)
                self.$emit('questionDeleting', questionId)
                self.$swal('your question has been deleted', {
                  icon: 'success'
                })
              })
              .catch(err => console.log(err))
          }
        })
    },
    checkLogin () {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('setToken', localStorage.getItem('token'))
      }
    },
    getAllQuestions () {
      let self = this
      this.$axios.get('questions')
        .then(({data}) => {
          self.$store.dispatch('setQuestions', data.questions)
        })
        .catch(err => console.log(err))
    },
    showingEdit (id) {
      if (this.showEdit.id === id) {
        this.showEdit.id = ''
      } else {
        this.showEdit.id = id
      }
    }
  },
  created () {
    this.getAllQuestions()
    this.checkLogin()
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

<style lang="css">
</style>
