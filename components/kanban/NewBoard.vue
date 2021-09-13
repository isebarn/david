<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
        New Board
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Board Name</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Name"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="newBoard()"
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
      name: '',
      dialog: false
    }
  },

  methods: {
    ...mapActions('kanban', ['createBoard']),

    newBoard () {
      this.createBoard(this.name)
      this.name = ''
      this.dialog = false
    }
  }
}
</script>
