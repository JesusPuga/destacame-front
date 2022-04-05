
<template>
  <section class="section is-medium">
    <h1 class="title">Horarios de trayecto</h1>
    <modal-general
      componentType="travel-form"
      :isOpenModal="isOpenModal"
      :closeButton="close"
      title="Trayectos"
      :buttonClick="create"
      :data="formData"
    />
    <div class="columns">
      <div class="column">
        <b-field
          label="Filtrar por porcentaje vendido mayor a:">
          <b-input
            v-model="filter"
            type="number"
            min="0"
            placeholder="10"
            required>
          </b-input>
        </b-field>
        <div class="is-flex is-justify-content-flex-end is-align-items-flex-end">
          <b-button @click="filterData" class="button is-info">Filtrar</b-button>
        </div>
      </div>
      <div class="column is-flex is-justify-content-flex-end is-align-items-flex-end">
        <b-button @click="openModal" class="button is-success">Agregar horario</b-button>
      </div>
    </div>
    <b-table :data="data">
      <b-table-column field="id" label="ID" width="10" numeric v-slot="props">
          {{ props.row.id }}
      </b-table-column>
      <b-table-column field="travel_plan_name" label="Nombre de viaje" width="10" v-slot="props">
          {{ props.row.travel_plan_name }}
      </b-table-column>
      <b-table-column field="bus_name" label="Autobús" width="10" v-slot="props">
          {{ props.row.bus_name }}
      </b-table-column>
      <b-table-column field="start_date_time" label="Fecha de inicio" width="20" v-slot="props">
          {{ props.row.start_date_time | formatDate }}
      </b-table-column>
      <b-table-column field="finish_date_time" label="Fecha de fin" width="20" v-slot="props">
          {{ props.row.finish_date_time | formatDate }}
      </b-table-column>
      <b-table-column field="avg_seats_sold" label="Porcentaje de asientos vendidos" width="20" v-slot="props">
          {{ props.row.avg_seats_sold + '%'}}
      </b-table-column>
      <b-table-column label="Acciones" custom-key="actions"  width="30" v-slot="props">
        <router-link :to="'/trayectos/' + $route.params.plan_id + '/horarios/' + props.row.id + '/pasajeros/'">
          <b-button class="button is-success mb-1">Pasajeros</b-button>
        </router-link>
        <b-button class="button is-info mb-1" @click="openEdit(props.row)">Editar</b-button>
        <b-button class="button is-danger" @click="openModalRemove(props.row)">Eliminar</b-button>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import TravelForm from './TravelForm.vue'
import { api } from '../utils/api'
import { format } from 'date-fns'

export default {
  components: { TravelForm },
  data () {
    return {
      data: [],
      isOpenModal: false,
      formData: {},
      filter: 0
    }
  },
  created () {
    api.get('travel/?travel_plan=' + this.$route.params.plan_id).then(response => {
      if (response.data) {
        this.data = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  filters: {
    formatDate (dateTime) {
      const newDate = new Date(dateTime.replace('Z', ''))
      return format(newDate, 'yyyy-MM-dd HH:mm:ss')
    }
  },
  methods: {
    filterData () {
      api.get('travel/?travel_plan=' + this.$route.params.plan_id + '&avg_seats_sold=' + this.filter).then(response => {
        if (response.data) {
          this.data = response.data
        }
      }).catch(e => {
        console.log(e)
      })
    },
    openEdit (data) {
      this.formData = data
      this.isOpenModal = true
    },
    close () {
      this.isOpenModal = false
    },
    openModal () {
      this.isOpenModal = true
    },
    remove (object) {
      api.delete('travel/' + object.id + '/').then(() => {
        const index = this.data.findIndex(o => o.id === object.id)
        this.$delete(this.data, index)
      }).catch(e => {
        console.log(e)
      })
    },
    openModalRemove (object) {
      this.$buefy.dialog.confirm({
        title: 'Eliminación de viaje',
        message: '¿Estás seguro que quieres eliminar?',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(object)
      })
    },
    create (data, id) {
      let response = null
      // update
      if (id) {
        response = api.patch('travel/' + id + '/', data).then(response => {
          if (response.data) {
            this.formData = {}
            this.isOpenModal = false
            const index = this.data.findIndex(o => o.id === id)
            this.$set(this.data, index, response.data)
          }
        })
      } else {
        response = api.post('travel/', data).then(response => {
          this.formData = {}
          this.isOpenModal = false
          if (response.data) this.data.push(response.data)
        })
      }
      return response
    }
  }
}
</script>
