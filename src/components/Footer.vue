<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="social in socials"
          :key="social.icon"
          class="mx-3 white--text"
          :href="social.url"
          target="_blank"
          icon
        >
          <v-icon size="24px">{{ social.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
      socials: [
        {
          icon: 'fab fa-facebook',
          url: 'https://web.facebook.com/lalo.forero'
        },
        {
          icon: 'fab fa-twitter',
          url: 'https://twitter.com/LaloForero'
        },
        {
          icon: 'fab fa-google-plus',
          url: '/'
        },
        {
          icon: 'fab fa-linkedin',
          url: 'https://www.linkedin.com/in/gerardo-forero-635017142/'
        },
        {
          icon: 'fab fa-instagram',
          url: 'https://www.instagram.com/laloforever'
        }
      ]
    })
  }
</script>