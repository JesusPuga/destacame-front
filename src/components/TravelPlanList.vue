
<template>
  <section class="section is-medium">
    <h1 class="title">Trayectos</h1>
    <modal-general
      componentType="travel-plan-form"
      :isOpenModal="isOpenModal"
      :closeButton="close"
      title="Plan de viaje"
      :buttonClick="create"
      :data="formData"
    />
    <div class="is-align-content-end is-flex is-justify-content-flex-end">
      <b-button @click="openModal" class="button is-success mb-1">Agregar</b-button>
    </div>
    <b-table :data="data">
      <b-table-column field="id" label="ID" width="10" numeric v-slot="props">
          {{ props.row.id }}
      </b-table-column>
      <b-table-column field="name" label="Nombre" width="30" v-slot="props">
          {{ props.row.name }}
      </b-table-column>
      <b-table-column field="avg_passenger" label="Promedio de pasajeros por viaje" width="30" v-slot="props">
          {{ props.row.avg_passenger | formatAvg }}
      </b-table-column>
      <b-table-column label="Acciones" custom-key="actions" width="30" v-slot="props">
        <router-link :to="'/trayectos/' + props.row.id + '/horarios/'">
          <b-button class="button is-success mb-1">Horarios</b-button>
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

export default {
  components: { TravelForm },
  data () {
    return {
      data: [],
      isOpenModal: false,
      formData: {}
    }
  },
  created () {
    api.get('travel_plan/').then(response => {
      if (response.data) {
        this.data = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  filters: {
    formatAvg (avg) {
      return avg.toFixed(2)
    }
  },
  methods: {
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
      api.delete('travel_plan/' + object.id + '/').then(() => {
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
        response = api.patch('travel_plan/' + id + '/', data).then(response => {
          if (response.data) {
            this.formData = {}
            this.isOpenModal = false
            const index = this.data.findIndex(o => o.id === id)
            this.$set(this.data, index, response.data)
          }
        })
      } else {
        response = api.post('travel_plan/', data).then(response => {
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
