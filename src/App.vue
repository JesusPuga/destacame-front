<template>
  <div id="app">
    <header-view v-if="logged"></header-view>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: { Header },
  name: 'App',
  data () {
    return {
      logged: window.localStorage.getItem('token')
    }
  }
}
</script>

<style >

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
