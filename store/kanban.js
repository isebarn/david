import { getField, updateField } from 'vuex-map-fields'
export const strict = false

export const state = () => ({
  boards: [],
  board: null
})

export const mutations = {
  updateField,

  boards: (state, payload) => {
    state.boards = payload
  },

  board: (state, payload) => {
    state.board = payload
  },

  addType: (state, payload) => {
    state.board.types.push(payload)
  },

  addItem: (state, payload) => {
    state.board.columns[payload.columnIdx].tasks.push(payload.item)
  },

  addColumn: (state, payload) => {
    state.board.columns.push(payload)
  }
}

export const getters = {
  getField
}

export const actions = {
  updateWeather ({ commit }, data) {
    commit('boards', data)
  },

  loadBoards ({ commit }, selectedBoard) {
    this.$axios.get('/api/boards').then((response) => {
      commit('boards', response.data)

      if (selectedBoard) {
        commit('board', response.data.find(x => x._id === selectedBoard))
      } else if (response.data.length > 0) {
        commit('board', response.data[0])
      }
    })
  },

  updateBoard ({ commit, state, dispatch }) {
    this.$axios.put('/api/boards', {
      board: state.board
    }).then((response) => {
    }).finally(() => {
      dispatch('loadBoards', state.board._id)
    })
  },

  createBoard ({ commit, dispatch }, name) {
    this.$axios.post('/api/boards', {
      name
    }).then((response) => {
      dispatch('loadBoards', response.data.insertedId)
    })
  },

  setBoard ({ commit }, board) {
    commit('board', board)
  },

  addType ({ commit, dispatch }, type) {
    commit('addType', type)
    dispatch('updateBoard')
  },

  addItem ({ commit, dispatch }, payload) {
    commit('addItem', payload)
    dispatch('updateBoard')
  },

  addColumn ({ commit, dispatch }, column) {
    commit('addColumn', column)
    dispatch('updateBoard')
  }
}
