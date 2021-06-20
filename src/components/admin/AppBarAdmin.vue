<template>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="toggleMini" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn text href="mailto:wangqiangshen@gmail.com">Hire Me</v-btn>
        <v-btn text href="https://www.isocked.com" target="_blank">Blog</v-btn>
        <v-btn icon href="https://github.com/tookit/vue-material-admin">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <v-menu
          offset-y
          origin="center center"
          class="elelvation-1"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn icon text slot="activator" v-on="on">
              <v-badge color="red" overlap>
                <span slot="badge">3</span>
                <v-icon medium>mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>
          <notification-list></notification-list>
        </v-menu>
        <v-menu
          offset-y
          origin="center center"
          class="elelvation-1"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on }">
            <v-btn text slot="activator" v-on="on">
              <v-icon medium>mdi-translate</v-icon>
              <span class="ml-2"> {{ localeText }} </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group v-model="$vuetify.lang.current">
              <v-list-item
                @click="handleChangeLocale(item)"
                v-for="item in availableLanguages"
                :key="item.value"
                :value="item.value"
              >
                <v-list-item-title v-text="item.text" />
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-menu offset-y origin="center center" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon large text slot="activator" v-on="on">
              <v-avatar size="30px">
                <img />
              </v-avatar>
            </v-btn>
          </template>
          <v-list class="pa-0">
            <v-list-item
              v-for="(item, index) in profileMenus"
              :to="!item.href ? { name: item.name } : null"
              :href="item.href"
              @click="item.click"
              :disabled="item.disabled"
              :target="item.target"
              rel="noopener"
              :key="index"
            >
              <v-list-item-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar tag="div" dense slot="extension" color="white" light>
        <v-chip
          v-for="(tab, i) in tabs"
          :key="i"
          :to="tab.path"
          active-class="primary"
          :close="tab.name !== 'dashboard'"
          @click:close="close(tab)"
          class="mr-3"
        >
          <v-icon v-if="tab.meta.icon" class="mr-2">{{ tab.meta.icon }}</v-icon>
          {{ tab.name }}
        </v-chip>
      </v-toolbar>
    </v-app-bar>
</template>

<script>
export default {
  name: 'appbaradmin'
}
</script>
