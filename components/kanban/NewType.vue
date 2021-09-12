<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        block
        v-bind="attrs"
        v-on="on"
      >
        New Type
        <v-spacer />
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>New Type</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="type.title"
          name="title"
          label="new type"
        />
        <v-text-field
          v-model="type.color"
          name="color"
          label="type color"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="addType(type); dialog=false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  data () {
    return {
      type: {
        title: '',
        color: ''
      },
      dialog: false
    }
  },

  methods: {
    ...mapActions('kanban', ['addType'])
  }
}
</script>
