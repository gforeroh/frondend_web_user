<template>
  <v-app>
    <v-content>
      <Toolbar></Toolbar>
      <Bread></Bread>
      <v-container>
        <router-view />
      </v-container>
      <Footer></Footer>
    </v-content>
    <v-dialog
      v-model="loading.estado"
      hide-overlay
      persistent
      width="300"
      >
      <v-card
        :color="loading.color"
        dark
      >
        <v-card-text>
          {{ loading.titulo }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>

import Toolbar from '@/components/Toolbar.vue'
import Footer from '@/components/Footer.vue'
import Bread from '@/components/Breadcrumbs.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Toolbar,
    Bread,
    Footer
  },
  data () {
    return {
        
    }
  },
  computed: {
    ...mapState(['loading', 'layout'])
  },
}
</script>
