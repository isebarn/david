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
    state.board.columns[0].tasks.push(payload)
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

  loadBoards ({ commit }) {
    this.$axios.get('https://david.isebarn.com/api/boards').then((response) => {
      commit('boards', response.data)
      commit('board', response.data[0])
    })
  },

  updateBoard ({ commit, state, dispatch }) {
    this.$axios.put('https://david.isebarn.com/api/boards', {
      board: state.board
    }).then((response) => {
    }).finally(() => {
      dispatch('loadBoards')
    })
  },

  createBoard ({ commit, dispatch }, name) {
    this.$axios.post('https://david.isebarn.com/api/boards', {
      name
    }).then((response) => {
      dispatch('loadBoards')
    })
  },

  setBoard ({ commit }, board) {
    commit('board', board)
  },

  addType ({ commit, dispatch }, type) {
    commit('addType', type)
    dispatch('updateBoard')
  },

  addItem ({ commit, dispatch }, type) {
    commit('addItem', type)
    dispatch('updateBoard')
  },

  addColumn ({ commit, dispatch }, column) {
    commit('addColumn', column)
    dispatch('updateBoard')
  }
}
