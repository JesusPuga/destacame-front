<template>
  <form action="">
    <b-field
      label="Nombre"
      :type="getType('name')"
      :message="errors.name[0]">
      <b-input
        v-model="name"
        maxlength="30"
        placeholder="Cancún"
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
  name: 'TravelPlanForm',
  props: [
    'buttonClick',
    'data'
  ],
  data () {
    const isUpdate = Object.keys(this.data).length
    return {
      name: isUpdate ? this.data.name : '',
      errors: {
        name: ['']
      }
    }
  },
  methods: {
    getType (type) {
      return this.errors[type][0] ? 'is-danger' : ''
    },
    handleClick () {
      console.log(this.name)
      const action = this.buttonClick({
        name: this.name
      }, 'id' in this.data ? this.data.id : '')

      if (action) {
        action.catch(e => {
          const newErrors = e.response.data

          for (let error in newErrors) {
            this.errors[error] = newErrors[error]
          }
        })
      }
    }
  }
}
</script>
