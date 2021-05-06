<template>
  <div>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="mini = !mini" />
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
    <v-navigation-drawer
      v-model="drawer"
      app
      color="secondary"
      :mini-variant="mini"
      permanent
    >
      <v-list :dense="drawerWidth !== 64" class="pa-0">
        <template v-for="(item, key) in items">
          <template v-if="item.children && item.children.length > 0">
            <v-list-group :key="key" no-action :to="item.path">
              <template v-slot:prependIcon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-text="item.meta.icon" />
                  </template>
                  <span>
                    {{ item.meta.title }}
                  </span>
                </v-tooltip>
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.meta.title" />
                </v-list-item-content>
              </template>
              <v-list-item
                :class="drawerWidth === 64 ? 'pl-4' : ''"
                v-for="subItem in item.children"
                :key="subItem.meta.title"
                :to="subItem.path"
              >
                <template v-if="drawerWidth === 64">
                  <v-list-item-icon>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          v-text="subItem.meta.icon"
                        />
                      </template>
                      <span>{{ subItem.meta.title }}</span>
                    </v-tooltip>
                  </v-list-item-icon>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-text="subItem.meta.title" />
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-group>
          </template>
          <template v-else>
            <v-list-item :key="key" :to="item.path">
              <v-list-item-icon>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" v-text="item.meta.icon" />
                  </template>
                  <span>{{ item.meta.title }}</span>
                </v-tooltip>
              </v-list-item-icon>
              <v-list-item-content v-if="drawerWidth !== 64">
                <v-list-item-title v-text="item.meta.title" />
              </v-list-item-content>
              <v-list-item-action v-if="item.new">
                <v-icon color="green">mdi-new-box </v-icon>
              </v-list-item-action>
            </v-list-item>
          </template>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import NotificationList from "./admin/Notifications.vue"
import { mapState, mapActions } from "vuex";

export default {
  components: { NotificationList },
  name: "defaultMenuFull",
  data: () => ({
    tabs: [],
    drawerWidth: 256,
    localeText: navigator.language,
    drawer: true,
    availableLanguages: [
      { text: 'English', value: 'en-EN'}
      ],
    profileMenus: [],
    items: []
  }),
  methods: {
    ...mapActions("menu/", ["toggleMini"]),

    close(tab) {
      const indexTab = this.tabs.findIndex(el => el.path === tab.path);
      // remove closed tab from array
      this.tabs.splice(indexTab, 1);
      // Then, we go in prev elem path
      if (
        this.$router.currentRoute.name !== "dashboard" &&
        this.$router.currentRoute.path !== this.tabs[this.tabs.length - 1].path
      ) {
        if (this.tabs[indexTab - 1]) {
          this.$router.push(this.tabs[this.tabs.length - 1].path);
        } else {
          this.$router.push("/admin/dashboard");
        }
      }
    }
  },
  watch: {
    $route(to) {
      const elemExist = this.tabs.findIndex(tab => tab.path == to.path);
      if (elemExist !== -1) return;
      this.tabs.push(to);
    }
  },
  created() {
    this.items = this.$router.options.routes.find(
      route => route.children
    ).children;
    this.tabs.push(this.$router.currentRoute);
    if (this.items.findIndex(item => item.name === "home") === -1) {
      this.items.push(
        this.$router.options.routes.find(route => route.name === "home")
      );
    }
  },
  mounted() {
    console.log(this);
  },
  computed: {
    ...mapState({
      mini: state => state.menu.mini
    })
  }
};
</script>
