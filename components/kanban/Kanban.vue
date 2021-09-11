<template>
  <v-container fluid pa-0 ma-0>
    <v-app-bar
      color="#CACACA"
      dense
      dark
    >
      <v-toolbar-title>
        <v-menu
          v-if="boards && board"
          open-on-hover
          top
          offset-y
        >
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
            >
              {{ board.name || 'select' }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, index) in boards"
              :key="index"
            >
              <v-list-item-title @click="board = item">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-title>

      <v-spacer />
      <v-dialog
        v-model="dialog"
        width="50%"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="red lighten-2"
            dark
            v-bind="attrs"
            v-on="on"
          >
            New Item
          </v-btn>
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
                    v-model="item.type"
                    :items="board.types"
                    item-text="title"
                    label="Type"
                  />
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
              @click="dialog = false; item.date= new Date(); board.columns[0].tasks.push(item); updateBoard()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
    <v-card flat>
      <v-text-field
        v-model="name"
        name="board"
        label="new board"
      />
      <v-btn @click="createBoard">
        create board
      </v-btn>
      <v-text-field
        v-model="type"
        name="type"
        label="new type"
      />
      <v-text-field
        v-model="color"
        name="color"
        label="type color"
      />
      <v-btn @click="board.types.push({title: type, color:color}); updateBoard()">
        create type
      </v-btn>
      <v-layout v-if="board" justify-center>
        <v-card
          v-for="(column, i) in board.columns"
          :key="i"
          class="rounded-lg px-3 py-3 column-width rounded mr-4"
          color="grey light-blue lighten-5"
        >
          <v-text-field v-model="column.title" class="text-gray-700 font-semibold font-sans tracking-wide text-sm" @change="updateBoard">
            {{ column.title }}
          </v-text-field>
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
            <task-card
              v-for="(task) in column.tasks"
              :key="task.id"
              :task="task"
              :types="board.types"
              class="mt-3 cursor-move"
            />
          </draggable>
        </v-card>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

export default {
  components: {
    TaskCard,
    draggable
  },

  data () {
    return {
      god: [
        {
          type: 'New',
          color: 'blue'
        }
      ],
      name: '',
      title: '',
      type: '',
      color: '',
      boards: [],
      board: null,
      dialog: false,
      types: [],
      item_type: {},
      open: false,
      item: {}
      /*      board: {
        name: 'Default',
        columns: [
          {
            title: 'Backlog',
            tasks: [
              {
                id: 1,
                title: 'Add discount code to checkout page',
                date: 'Sep 14',
                type: 'Feature Request'
              }
            ]
          }
        ]
      } */
    }
  },

  async fetch () {
    const response = await this.$axios.get('/api/boards')
    this.boards = response.data
    this.board = response.data[0]
  },

  computed: {
    itemTypes () {
      return []
    }
  },

  methods: {
    newItem (column) {
      this.open = true
      this.item = {
        title: '',
        content: '',
        date: new Date().toISOString()
      }
    },

    updateBoard () {
      this.$axios.put('/api/boards', {
        board: this.board
      }).then((response) => {
      }).finally(() => {
        this.loading = false
      })
    },

    loadBoards () {
      this.$axios.get('/api/boards').then((response) => {
        this.boards = response.data
        this.board = this.boards[0]
      })
    },

    createBoard () {
      this.$axios.post('/api/boards', {
        name: this.name
      }).then((response) => {
        this.$axios.get('/api/boards/' + response.data.insertedId).then((response) => {
          this.board = response.data
        })
      }).finally(() => {
        this.loading = false
      })
    },

    createType () {
      this.board.types.push({
        type: this.type,
        color: this.color
      })
      this.updateBoard()
    }
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
