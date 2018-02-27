<template>
  <div class="nav">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ path: '/' }">
          <span class="tag is-info is-rounded">Naqi-overflow</span>
        </router-link>
        <div @click="setNavbur" class="navbar-burger burger" data-target="navMenuColordark-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenuColordark-example" :class="navbur">
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link :to="{ path: navigate }" class="button is-info is-rounded">{{ namePath }}</router-link>
          </div>
          <div class="navbar-item">
            <a @click="logout" class="button is-danger is-rounded">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  props: [
    'navigate'
  ],
  data () {
    return {
      navbur: 'navbar-menu',
      namePath: ''
    }
  },
  methods: {
    logout () {
      let self = this
      self.$swal({
        title: 'Are you sure to logout?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then(willLogout => {
          if (willLogout) {
            self.$swal('success to logout', {
              icon: 'success'
            })
            localStorage.clear()
            this.$router.push('/login')
          }
        })
    },
    setNavbur () {
      if (this.navbur.indexOf('is-active') !== -1) {
        this.navbur = 'navbar-menu'
      } else {
        this.navbur = 'navbar-menu is-active'
      }
    },
    setNamePath () {
      if (this.navigate === '/') {
        this.namePath = 'Home'
      } else {
        this.namePath = 'Profile'
      }
    }
  },
  created () {
    this.setNamePath()
  }
}
</script>

<style scoped>
</style>
