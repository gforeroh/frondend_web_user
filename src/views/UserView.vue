<template>
  <div>
    <h1>Desde vista de usuario</h1>
    <h2>Nombre: {{ userItem.name }} {{ userItem.lastname }}</h2>
    <h2>Usuario: {{ userItem.username }}</h2>
    <h2>Correo: {{ userItem.email }}</h2>

    <v-btn small
        v-if="$routerHistory.hasPrevious()"
        :to="{ path: $routerHistory.previous().path }"
        color="info"
        >
        Ir atras
    </v-btn>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import VueRouterBackButton from 'vue-router-back-button'
Vue.use(VueRouterBackButton, {
  router,
  ignoreRoutesWithSameName: true,
})
export default {
  data() {
    return {
      userItem: {
        name: '',
        lastname: '',
        username: '',
        email: ''
      }
    }
  },
  created () {
    this.getUser()    
  },
  methods: {
    async getUser(){
      try {
        let id = this.$route.params.id
        let user = await axios.get(`${process.env.VUE_APP_API_WEB}/users/${id}`);
        this.userItem = await Object.assign(this.userItem, user.data)
      } catch (error) {
        console.log(error);
      } finally {

      }
    }
  }
}
</script>
