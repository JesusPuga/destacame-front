<template>
  <form action="">
    <b-field
      label="Fecha y hora de inicio"
      :type="getType('start_date_time')"
      :message="errors.start_date_time[0]">
      <b-datetimepicker
          append-to-body
          v-model="start_date_time"
          placeholder="Clic para seleeccionar...">
      </b-datetimepicker>
    </b-field>
    <b-field
      label="Fecha y hora de fin"
      :type="getType('finish_date_time')"
      :message="errors.finish_date_time[0]">
      <b-datetimepicker
          append-to-body
          v-model="finish_date_time"
          placeholder="Clic para seleeccionar...">
      </b-datetimepicker>
    </b-field>
    <b-field
      label="Autobús"
      :type="getType('non_field_errors', 'bus')"
      :message="errors.non_field_errors[0]">
      <b-select
        v-model="bus"
        placeholder="Selecciona un autobús"
        required>
        <option
            v-for="option in buses"
            :value="option.id"
            :key="option.id">
            {{ option.id }} - {{ option.name }}
        </option>
      </b-select>
    </b-field>
    <b-button
      class="mt-2"
      label="Crear"
      type="is-info"
      @click="handleClick"/>
  </form>
</template>

<script>
import { api } from '../utils/api'
import { format } from 'date-fns'
export default {
  name: 'TravelForm',
  props: [
    'buttonClick',
    'data'
  ],
  created () {
    api.get('bus/').then(response => {
      if (response.data) {
        this.buses = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  data () {
    const isUpdate = Object.keys(this.data).length
    return {
      bus: isUpdate ? this.data.bus : '',
      start_date_time: isUpdate ? new Date(this.data.start_date_time.replace('Z', '')) : new Date(),
      finish_date_time: isUpdate ? new Date(this.data.finish_date_time.replace('Z', '')) : new Date(),
      buses: [],
      errors: {
        non_field_errors: [''],
        start_date_time: [''],
        finish_date_time: [''],
        bus: ['']
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
        bus: this.bus,
        travel_plan: this.$route.params.plan_id,
        start_date_time: format(this.start_date_time, 'yyyy-MM-dd HH:mm:ss'),
        finish_date_time: format(this.finish_date_time, 'yyyy-MM-dd HH:mm:ss')
      }, 'id' in this.data ? this.data.id : '')

      if (action) {
        action.catch(e => {
          const newErrors = e.response.data
          for (let error in newErrors) {
            if (error === 'non_field_errors' && newErrors[error][0].includes('fecha/hora')) {
              this.errors['start_date_time'] = newErrors[error]
            } else {
              this.errors[error] = newErrors[error]
            }
          }
        })
      }
    }
  }
}
</script>
