<template>
    <div>
        <v-parallax
            dark
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            >
            <v-layout
            align-center
            column
            justify-center
            >
            <h1 class="display-2 font-weight-thin mb-3">Usuarios</h1>
            <h4 class="subheading">Construye tu aplicación hoy!</h4>
            </v-layout>
        </v-parallax>
        <TableUsers></TableUsers>
    </div>
</template>
<script>
import TableUsers from '@/components/TableUsers.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        TableUsers
    },
    data(){
        return{
           
        }
    },
    created () {
        let nose = this.$route.params 
    },
    methods: {
        ...mapMutations(['mostrarLoading', 'ocultarLoading']),
    }
}
</script>


