
<template>
  <section class="section is-medium">
    <h1 class="title">Pasajeros asignados</h1>
    <modal-general
      componentType="travel-sale-form"
      :isOpenModal="isOpenModal"
      :closeButton="close"
      title="Asignación de asientos"
      :buttonClick="create"
      :data="formData"
    />
    <div class="is-align-content-end is-flex is-justify-content-flex-end">
      <b-button @click="openModal" class="button is-success mb-1">Agregar</b-button>
    </div>
    <b-table :data="data">
      <b-table-column field="id" label="ID" width="20" numeric v-slot="props">
          {{ props.row.id }}
      </b-table-column>
      <b-table-column field="seat_number" label="Pasajero" width="20" v-slot="props">
          {{ props.row.passenger_name }}
      </b-table-column>
      <b-table-column field="bus_name" label="Asiento" width="20" v-slot="props">
          {{ props.row.seat_number }}
      </b-table-column>
      <b-table-column field="start_date_time" label="Trayecto" width="20" v-slot="props">
          {{ props.row.travel_name }}
      </b-table-column>
      <b-table-column label="Acciones" custom-key="actions" width="20" v-slot="props">
        <b-button class="button is-info mb-1" @click="openEdit(props.row)">Editar</b-button>
        <b-button class="button is-danger" @click="openModalRemove(props.row)">Eliminar</b-button>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import TravelSaleForm from './TravelSaleForm.vue'
import { api } from '../utils/api'

export default {
  components: { TravelSaleForm },
  data () {
    return {
      data: [],
      isOpenModal: false,
      formData: {}
    }
  },
  created () {
    const travel = this.$route.params.id
    api.get('journey/?travel=' + travel).then(response => {
      if (response.data) {
        this.data = response.data
      }
    }).catch(e => {
      console.log(e)
    })
  },
  methods: {
    openEdit (data) {
      this.formData = data
      this.isOpenModal = true
    },
    close () {
      this.isOpenModal = false
      this.formData = {}
    },
    openModal () {
      this.isOpenModal = true
    },
    remove (object) {
      api.delete('journey/' + object.id + '/').then(() => {
        const index = this.data.findIndex(o => o.id === object.id)
        this.$delete(this.data, index)
      }).catch(e => {
        console.log(e)
      })
    },
    openModalRemove (object) {
      this.$buefy.dialog.confirm({
        title: 'Eliminación de pasaje',
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
        response = api.put('journey/' + id + '/', data).then(response => {
          if (response.data) {
            this.isOpenModal = false
            this.formData = {}
            const index = this.data.findIndex(o => o.id === id)
            this.$set(this.data, index, response.data)
          }
        })
      } else {
        response = api.post('journey/', data).then(response => {
          this.isOpenModal = false
          if (response.data) this.data.push(response.data)
        })
      }
      return response
    }
  }
}
</script>
