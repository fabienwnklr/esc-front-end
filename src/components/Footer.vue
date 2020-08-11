<template>
  <v-footer color="primary lighten-1" padless>
        <v-row justify="center" no-gutters>
          <v-btn
            v-for="link in links"
            :key="link"
            color="white"
            text
            rounded
            class="my-2"
            to="/about"
          >{{ link }}</v-btn>
          <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
            <small>
          Make with
          <v-icon> mdi-heart </v-icon>by
          <a href="#">Fabb</a>
        </small>
        <br>
        <small class="ml-2">v.0.1</small>
          </v-col>
        </v-row>
      </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data : () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ]
  })
}
</script>