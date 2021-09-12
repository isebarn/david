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
    <v-container>
      <v-layout v-if="board" justify-center pt-5>
        <v-card
          v-for="(column, i) in board.columns"
          :key="i"
          class="rounded-lg px-3 py-3 column-width rounded mr-4"
          color="grey light-blue lighten-5"
        >
          <v-text-field v-model="column.title" class="text-gray-700 font-semibold font-sans tracking-wide text-sm" @change="updateBoard">
            {{ column.title }}
          </v-text-field>
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks" @end="updateBoard">
            <task-card
              v-for="(task) in column.tasks"
              :key="task.date"
              :task="task"
              :types="board.types"
              class="mt-3 cursor-move"
            />
          </draggable>
          <v-list-item><new-item /></v-list-item>
        </v-card>
      </v-layout>
    </v-container>
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

  created () {
    this.loadBoards()
  },

  computed: {
    ...mapFields('kanban', [
      'boards',
      'board'
    ])
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
</style>
