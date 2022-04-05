
<template>
  <b-modal
      :can-cancel="false"
      :active="isOpenModal">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">{{title}}</p>
            <button
              type="button"
              class="delete"
              @click="closeButton"/>
        </header>
        <section class="modal-card-body">
          <component
            :is="componentType"
            ref="test"
            :buttonClick="buttonClick"
            :data="data"
          />
        </section>
      </div>
  </b-modal>
</template>

<script>

export default {
  props: [
    'componentType',
    'isOpenModal',
    'closeButton',
    'title',
    'buttonClick',
    'data'
  ]
}
</script>
