<template>
  <div class="login">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Naqi's overflow
          </h1>
          <h2 class="subtitle">
            Please login first
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="loginform">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="dataLogin.email" class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="dataLogin.password" class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control" id="login-button">
                <button @click="login" class="button is-success">
                  Login
                </button>
              </p>
            </div>
          </div>
        </div>
        <section class="hero is-info">
          <div class="hero-body">
            <div class="container">
              <h2 class="subtitle">
                Don't have an account?
              </h2>
            </div>
          </div>
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <div class="content">
                  Sign Up here
                </div>
              </article>
            </div>
          </div>
        </section>
        <div class="column">
          <div class="loginform">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input v-model="dataSignup.email" class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="dataSignup.password" class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input v-model="passwordConfirmation" :class="psw" type="password" placeholder="Password Confirmation">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control" id="login-button">
                <button @click="signup" class="button is-info">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      passwordConfirmation: '',
      dataLogin: {
        email: '',
        password: ''
      },
      dataSignup: {
        email: '',
        password: ''
      },
      psw: 'input'
    }
  },
  methods: {
    login () {
      let self = this
      if (this.dataLogin.email && this.dataLogin.password) {
        this.$axios.post('users/signin', {
          email: self.dataLogin.email,
          password: self.dataLogin.password
        })
          .then(response => {
            localStorage.setItem('token', response.data.token)
            self.$store.dispatch('setToken', response.data.token)
            self.$swal('berhasil sign up!', {
              icon: 'success'
            })
            self.$router.push('/')
          })
          .catch(err => {
            console.log(err)
            this.$swal('username / password salah', {
              icon: 'warning'
            })
          })
      } else {
        this.$swal('isi yang bener', {
          icon: 'warning'
        })
      }
    },
    signup () {
      let self = this
      if (this.dataSignup.email && this.dataSignup.password && this.passwordConfirmation) {
        this.$axios.post('users/signup', {
          email: self.dataSignup.email,
          password: self.dataSignup.password
        })
          .then(({ data }) => {
            self.$axios.post('users/signin', {
              email: self.dataSignup.email,
              password: self.dataSignup.password
            })
              .then(response => {
                localStorage.setItem('token', response.data.token)
                self.$store.dispatch('setToken', response.data.token)
                self.$swal('berhasil sign up!', {
                  icon: 'success'
                })
                self.$router.push('/')
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      } else {
        this.$swal('isi yang bener', {
          icon: 'warning'
        })
      }
    }
  },
  created () {
  },
  watch: {
    passwordConfirmation (value) {
      if (value.length > 0) {
        if (value !== this.dataSignup.password) {
          this.psw += ' is-danger'
        } else {
          this.psw = 'input'
        }
      } else {
        this.psw = 'input'
      }
    }
  }
}
</script>

<style scoped>
.loginform {
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
}

#login-button {
  text-align: center;
}
</style>
