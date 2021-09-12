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
        <v-icon>mdi-chart-bubble</v-icon>
        Menu
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-app-bar
        flat
      >
        <v-card-title class="text-h5 lighten-2">
          Select Board
        </v-card-title>
        <v-spacer />
        <new-board />
      </v-app-bar>
      <v-card-content>
        <v-list>
          <v-list-item-group
            active-class="border"
            color="indigo"
          >
            <v-list-item
              v-for="item in boards"
              :key="item._id"
              :value="item"
              @click="setBoard(item); dialog = false"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-content>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import NewBoard from './NewBoard.vue'
export default {

  components: {
    NewBoard
  },

  data () {
    return {
      dialog: false,
      newBoard: false
    }
  },

  computed: {
    ...mapFields('kanban', ['boards', 'board'])
  },

  methods: {
    ...mapActions('kanban', ['setBoard'])
  }
}
</script>
