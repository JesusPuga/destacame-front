<template>
  <form action="">
    <b-field label="Nombre">
      <b-input
        v-model="name"
        maxlength="30"
        placeholder="Alfredo"
        required>
      </b-input>
    </b-field>
    <b-field label="Apellido">
      <b-input
        v-model="last_name"
        maxlength="30"
        placeholder="Hernández"
        required>
      </b-input>
    </b-field>
    <b-button
      label="Crear"
      type="is-info"
      @click="handleClick"/>
  </form>
</template>

<script>
export default {
  name: 'DriverForm',
  props: [
    'buttonClick',
    'data'
  ],
  data () {
    const isUpdate = Object.keys(this.data).length
    return {
      name: isUpdate ? this.data.name : '',
      last_name: isUpdate ? this.data.last_name : ''
    }
  },
  methods: {
    handleClick () {
      console.log(this.name)
      this.buttonClick({name: this.name, last_name: this.last_name}, 'id' in this.data ? this.data.id : '')
    }
  }
}
</script>
