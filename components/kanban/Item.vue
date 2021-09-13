<template>
  <v-dialog
    v-model="dialog"
    width="50%"
  >
    <template #activator="{ on, attrs }">
      <v-layout align-end mt-5 justify-center>
        <v-btn
          color="blue lighten-2"
          dark
          v-bind="attrs"
          rounded
          icon
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-layout>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">New Item</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="item.title"
                label="Title"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.content"
                label="content"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-select
                v-if="board"
                ref="vSelect"
                v-model="item.type"
                :items="board.types"
                item-text="title"
                label="Label"
              >
                <template #append-item>
                  <v-divider class="mb-2" />
                  <new-type />
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="dialog = false"
        >
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="newItem()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import NewType from './NewType.vue'

export default {
  components: {
    NewType
  },

  props: {
    columnIdx: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      dialog: false,
      item: {}
    }
  },

  computed: {
    ...mapFields('kanban', ['boards', 'board'])
  },

  watch: {
    board (oldBoard, newBoard) {
      if (this.$refs.vSelect) {
        this.item.type = newBoard.types[newBoard.types.length - 1].title
        this.$refs.vSelect.blur()
      }
    }
  },

  methods: {
    ...mapActions('kanban', ['addItem']),

    newItem () {
      this.item.date = new Date()
      this.addItem({ item: this.item, columnIdx: this.columnIdx })
      this.item = {}
      this.dialog = false
    }
  }
}
</script>
