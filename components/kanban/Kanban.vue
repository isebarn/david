<template>
  <v-container fluid pa-0 ma-0 style="background: #FFFFFF;">
    <v-app-bar
      color="#CACACA"
      dense
      dark
    >
      <v-toolbar-title>Boards <board-menu /></v-toolbar-title>

      <v-spacer />
      <new-column />
    </v-app-bar>
    <v-container v-if="board" v-masonry :fluid="board.columns.length > 3">
      <v-layout
        v-for="(column, columnIdx) in board.columns"
        :key="columnIdx"
        v-masonry-tile
        justify-center
        pt-5
      >
        <v-card
          class="rounded-lg px-3 py-3 column-width rounded mr-4"
          color="grey light-blue lighten-5"
        >
          <v-container>
            <input v-model="column.title" @change="updateBoard">
          </v-container>
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks" @end="updateBoard">
            <task-card
              v-for="task in column.tasks"
              :key="task.date"
              :task="task"
              :types="board.types"
              class="mt-3 cursor-move"
            />
          </draggable>
          <v-list-item><new-item :column-idx="columnIdx" /></v-list-item>
        </v-card>
      </v-layout>
    </v-container>
    </v-layout>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
import { mapFields } from 'vuex-map-fields'
import { mapActions } from 'vuex'
import TaskCard from './TaskCard.vue'
import BoardMenu from './BoardMenu.vue'
import NewItem from './Item.vue'
import NewColumn from './NewColumn.vue'

export default {
  components: {
    TaskCard,
    BoardMenu,
    draggable,
    NewItem,
    NewColumn
  },

  computed: {
    ...mapFields('kanban', [
      'boards',
      'board'
    ])
  },

  created () {
    this.loadBoards()
  },

  methods: {
    ...mapActions('kanban', ['loadBoards', 'createBoard', 'updateBoard'])
  }
}
</script>
<style scoped>

.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #F7FAFC;
  border: 1px solid #4299e1;
}

textarea:focus, input:focus{
    outline: none;
}
</style>
