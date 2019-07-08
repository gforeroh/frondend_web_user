<template>
  <div>
    <!-- <v-breadcrumbs :items="items">
      <template v-slot:item="props">
        <a :href="props.item.href" :class="[props.item.disabled && 'disabled']">{{ props.item.text.toUpperCase() }}</a>
      </template>
    </v-breadcrumbs> -->
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>forward</v-icon>
      </template>
    </v-breadcrumbs>
    <!-- <h1 v-else>Oh no 😢</h1> -->
  </div>
</template>
<style lang="stylus" scoped>
  .disabled
    color: grey
    pointer-events: none
</style>
<script>
  export default {
    data: () => ({
      itemBread: {
        text: '',
        disabled: false,
        to: '/'
      },
      items: []
    }),
    created(){
      // this.rutas()
    },
    watch: {
      // call again the method if the route changes
      '$route': 'rutas'
    },
    methods: {
      rutas(){
        let rutes  = this.$route.matched
        this.items = []
        let items = this.items
        let countRutes = rutes.length;        
        rutes.forEach(function(value, index) {
          let itemBread = {}
          let disabled = (index+1 < countRutes) ? false : true;
        
          itemBread = Object.assign(itemBread, {
            text: value.meta.breadcrumb,
            disabled: disabled,
            to: value.redirect
          })
          
          items.push(itemBread)
        });
        
        this.items=items
      }
    },
  }
</script>