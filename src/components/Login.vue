<template>
  <section>
    <div class="section is-flex is-justify-content-center  is-align-items-center is-flex-direction-column">
      <div>
        <img width="300px" height="300px" src="../assets/logo.jpg">
      </div>
      <div class="pl-3">
        <b-field
          label="Correo:"
          :type="getType('email')"
          :message="errors.email[0]">
            <b-input v-model="email" placeholder="ejemplo@bus.conm"  maxlength="30" type="email" message="Correo inválido"></b-input>
        </b-field>
        <b-field
          label="Password:"
          :type="getType('password')"
          :message="errors.password[0]">
            <b-input type="password" v-model="password" message="This email is invalid" password-reveal></b-input>
        </b-field>
        <b-field>
          <b-button class="button is-primary" @click="login">Iniciar sesión</b-button>
        </b-field>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from '../utils/api'

export default {
  name: 'Login',
  data () {
    return {
      password: '',
      email: '',
      errors: {
        email: [''],
        password: ['']
      }
    }
  },
  methods: {
    getType (type) {
      return this.errors[type][0] ? 'is-danger' : ''
    },
    login () {
      api.post('/users/login/', {password: this.password, email: this.email}).then(response => {
        window.localStorage.setItem('token', response.data.access_token)
        window.location.href = '/tablero'
      }).catch(e => {
        const newErrors = e.response.data

        for (let error in newErrors) {
          this.errors[error] = newErrors[error]
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
