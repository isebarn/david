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
        New Swimlane
      </v-btn>
    </template>
    <v-card>
      <v-card-title>New Swimlane</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="column.title"
          label="Swimlane Title"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="newColumn()"
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
      column: {
        tasks: []
      },
      dialog: false
    }
  },

  methods: {
    ...mapActions('kanban', ['addColumn']),

    newColumn () {
      this.addColumn(this.column)
      this.column = {
        tasks: []
      }
      this.dialog = false
    }
  }
}
</script>
