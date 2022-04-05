<template>
  <form action="">
    <b-field
      label="Conductor"
      :type="getType('non_field_errors')"
      :message="errors.non_field_errors[0]">
      <b-select
        v-model="driver"
        placeholder="Selecciona un conductor">
        <option
            v-for="option in drivers"
            :value="option.id"
            :key="option.id">
            {{ option.id }} - {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="Nombre"
      :type="getType('name')"
      :message="errors.name">
      <b-input
        v-model="name"
        minlength="2"
        maxlength="30"
        placeholder="Bus 31"
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
import { api } from '../utils/api'

export default {
  name: 'BusForm',
  props: [
    'buttonClick',
    'data'
  ],
  created () {
    api.get('driver/').then(response => {
      if (response.data) {
        this.drivers = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  data () {
    const isUpdate = Object.keys(this.data).length
    return {
      name: isUpdate ? this.data.name : '',
      drivers: [],
      driver: isUpdate ? this.data.driver : '',
      errors: {
        non_field_errors: [''],
        name: ['']
      }
    }
  },
  methods: {
    getType (type) {
      return this.errors[type][0] ? 'is-danger' : ''
    },
    handleClick () {
      const action = this.buttonClick({
        name: this.name,
        driver: this.driver
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
