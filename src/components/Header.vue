<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img src="../assets/logo.jpg">
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item tag="router-link" :to="{ path: '/conductores' }">
                Conductores
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/autobuses' }">
                Autobuses
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/pasajeros' }">
                Pasajeros
            </b-navbar-item>
            <b-navbar-item tag="router-link" :to="{ path: '/trayectos' }">
                Trayectos
            </b-navbar-item>
            <b-navbar-item>
              <div @click="closeSession">
                Cerrar sesión
              </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    closeSession () {
      window.localStorage.removeItem('token')
      window.location.href = '/login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
