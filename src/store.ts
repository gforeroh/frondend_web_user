import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'login-layout',
    loading: {
      titulo: '',
      color: 'primary',
      estado: false
    },
  },
  mutations: {
    mostrarLoading(state, payload){
      state.loading.titulo = payload.titulo
      state.loading.color = payload.color
      state.loading.estado = true
    },
    ocultarLoading(state){
      state.loading.estado = false
    },
    setLayout(state, newLayout) {
      state.layout = newLayout
    }
  },
  actions: {

  }
})
