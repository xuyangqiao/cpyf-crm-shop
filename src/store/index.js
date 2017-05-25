import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  footerSelect: 0,
  userDefault: {
    agentId: '',
    name: ''
  }
}

const mutations = {
  footerSelect (state, select) {
    state.footerSelect = select
  },
  userDefault (state, data) {
    state.userDefault = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
