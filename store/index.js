import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  board: [
    {
      name: '1',
      items: [
        {
          title: 'a'
        },
        {
          title: 'b'
        }
      ]
    },
    {
      name: '2',
      items: [
        {
          title: 'c'
        },
        {
          title: 'd'
        }
      ]
    }
  ]
})

export const mutations = {
  updateField,

  board: (state, payload) => {
    state.board.push(payload)
  }
}

export const getters = {
  getField
}

export const actions = {
  updateBoard ({ commit }, data) {
    commit('board', data)
  }
}
