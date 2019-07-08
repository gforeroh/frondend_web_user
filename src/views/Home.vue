<template>
  <div class="home">
    <v-btn to="/login" color="success">Success</v-btn>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src
import { mapMutations } from 'vuex'

export default {
  components: {
    HelloWorld
  },
  methods: {
    ...mapMutations(['mostrarLoading', 'ocultarLoading', 'setLayout']),
  },
  created () {
      this.setLayout('principal-layout')
  }
}
</script>
