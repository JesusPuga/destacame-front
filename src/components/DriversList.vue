
<template>
  <section class="section is-medium">
    <h1 class="title">Conductores</h1>
    <modal-general
      componentType="driver-form"
      :isOpenModal="isOpenModal"
      :closeButton="close"
      title="Conductores"
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
      <b-table-column field="last_name" label="Apellido" width="30" v-slot="props">
          {{ props.row.last_name }}
      </b-table-column>
      <b-table-column label="Acciones" custom-key="actions"  width="30" v-slot="props">
        <b-button class="button is-info mb-1" @click="openEdit(props.row)">Editar</b-button>
        <b-button class="button is-danger" @click="openModalRemove(props.row)">Eliminar</b-button>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
import DriverForm from './DriverForm.vue'
import { api } from '../utils/api'

export default {
  components: { DriverForm },
  data () {
    return {
      data: [],
      isOpenModal: false,
      formData: {}
    }
  },
  created () {
    api.get('driver/').then(response => {
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
    },
    openModal () {
      this.isOpenModal = true
    },
    remove (object) {
      api.delete('driver/' + object.id + '/').then(response => {
        if (response.data) {
          const index = this.data.findIndex(o => o.id === object.id)
          this.$delete(this.data, index)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    openModalRemove (object) {
      this.$buefy.dialog.confirm({
        title: 'Eliminación de conductor',
        message: '¿Estás seguro que quieres eliminar?',
        confirmText: 'Eliminar',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.remove(object)
      })
    },
    create (data, id) {
      // update
      if (id) {
        api.patch('driver/' + id + '/', data).then(response => {
          if (response.data) {
            const index = this.data.findIndex(o => o.id === id)
            this.$set(this.data, index, response.data)
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        api.post('driver/', data).then(response => {
          if (response.data) this.data.push(response.data)
        }).catch(e => {
          console.log(e)
        })
      }

      this.formData = {}
      this.isOpenModal = false
    }
  }
}
</script>
