import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  footerSelect: 0,
  userDefault: {
    agentId: '',
    name: ''
  },
  footerShow: true
}

const mutations = {
  footerSelect (state, select) {
    state.footerSelect = select
  },
  // 某些页面需要隐藏页脚
  footerShow (state, flag) {
    state.footerShow = flag
  },
  userDefault (state, data) {
    state.userDefault = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
