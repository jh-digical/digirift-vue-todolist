export const state = () => ({
  data: null,
  totalItems: 0,
  hasDone: false,
  tasksDone: 0,
  lastId: 0,
})

export const mutations = {
  setData(state, newData) {
    state.data = newData
  },

  setTotalItems(state, total) {
    state.totalItems = total
  },

  setLastId(state, id) {
    state.lastId = id
  },

  toggleHasDone(state, bool) {
    state.hasDone = bool
  },

  totalTasksDone(state, total) {
    state.tasksDone = total
  },

  updateData(state, updatedItems) {
    state.data = updatedItems
  },
}

export const actions = {
  // Action to set data and update localStorage
  setData({ commit }, newData) {
    commit('setData', newData)

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(newData))
  },

  setTotalItems({ commit }, total) {
    commit('setTotalItems', total)
  },

  setLastId({ commit }, id) {
    commit('setLastId', id)
  },

  toggleHasDone({ commit }, bool) {
    commit('toggleHasDone', bool)
  },

  setTotalTasksDone({ commit }, total) {
    commit('totalTasksDone', total)
  },

  // Action to update an item
  updateData({ commit }, updatedItems) {
    commit('updateData', updatedItems)

    // Update localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedItems))
  },
}

export const getters = {
  // Getter to access the data from the state
  getData(state) {
    return state.data
  },
}
