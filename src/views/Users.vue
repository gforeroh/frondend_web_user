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
            <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
            <h4 class="subheading">Build your application today!</h4>
            </v-layout>
        </v-parallax>
        <v-btn color="info" @click="mostrarLoading({titulo: 'Cargando información', color: 'error'})">Info</v-btn>
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
        console.log("usersView1111");
        let nose = this.$route.params
        console.log(nose);
        
    },
    methods: {
        ...mapMutations(['mostrarLoading', 'ocultarLoading']),
    },
    
}
</script>


