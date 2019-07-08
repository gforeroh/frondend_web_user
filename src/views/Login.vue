<template>
  <v-container>
      <v-layout row>
          <v-flex xs12 sm6 m4 offset-xs0 offset-sm3 offset-m4>
              <v-form>
                  <v-text-field label="Nombre de Usuario" v-model="username"></v-text-field>
                  <v-text-field label="Contraseña" type="password" v-model="password"></v-text-field>
                  <v-btn block color="primary" @click="handleSubmit">Entrar</v-btn>
              </v-form>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import axios from 'axios'
  export default {
    data(){
        return {
            username : "",
            password : ""
        }
    },
    methods : {
      ...mapMutations(['mostrarLoading', 'ocultarLoading', 'setLayout']),
      async handleSubmit(e){
        e.preventDefault()
        try {
          let response = await axios.post(`${process.env.VUE_APP_API_WEB}/login`, {
            username: this.username,
            password: this.password
          })
        } catch (error) {
          console.log(error);
        }

        

        /* if (this.password.length > 0) {
          this.$http.post('http://localhost:3000/login', {
              email: this.email,
              password: this.password
          })
          .then(response => {

          })
          .catch(function (error) {
              console.error(error.response);
          });
        } */
      }
    },
    created () {
        // this.$store.commit('setLayout', 'login-layout')
        this.setLayout('login-layout')
    }
  }
</script>