<template>
  <component :is="layout"></component>
</template>

<script>
import LoginLayout from '@/components/layouts/Login'
import PrincipalLayout from '@/components/layouts/Principal'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    LoginLayout, 
    PrincipalLayout
  },
  data () {
    return {
      layoutSet: 'principal-layout'
    }
  },
  computed: {
    ...mapState(['layout'])
  },
}
</script>
