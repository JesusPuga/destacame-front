<template>
  <div>
    <div class="img-container">
      <img src="../assets/logo.jpg">
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img-container{
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
