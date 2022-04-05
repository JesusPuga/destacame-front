<template>
  <form action="">
    <b-field
      label="Pasajero"
      :type="getType('passenger')"
      :message="errors.passenger[0]">
      <b-select
        v-model="passenger"
        placeholder="Selecciona un pasajero"
        required>
        <option
            v-for="option in passengers"
            :value="option.id"
            :key="option.id">
            {{ option.id }} - {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-field
      label="Asiento"
      :type="getType('non_field_errors')"
      :message="errors.non_field_errors[0]">
      <b-input
        type="number"
        v-model="seat_number">
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
  name: 'TravelSaleForm',
  props: [
    'buttonClick',
    'data'
  ],
  created () {
    api.get('passenger/').then(response => {
      if (response.data) {
        this.passengers = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  data () {
    const isUpdate = Object.keys(this.data).length
    return {
      seat_number: isUpdate ? this.data.seat_number : '',
      passengers: [],
      passenger: isUpdate ? this.data.passenger : {},
      errors: {
        non_field_errors: [''],
        passenger: ['']
      }
    }
  },
  methods: {
    getType (type) {
      return this.errors[type][0] ? 'is-danger' : ''
    },
    handleClick () {
      const action = this.buttonClick({
        seat_number: this.seat_number,
        passenger: this.passenger,
        travel: this.$route.params.id
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
