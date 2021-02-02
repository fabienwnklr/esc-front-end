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
                    <v-icon v-bind="attrs" v-on="on" v-text="item.icon" />
                  </template>
                  <span>
                    {{ item.title }}
                  </span>
                </v-tooltip>
              </template>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title" />
                </v-list-item-content>
              </template>
              <v-list-item
                :class="drawerWidth === 64 ? 'pl-4' : ''"
                v-for="subItem in item.children"
                :key="subItem.title"
                :to="subItem.path"
              >
                <template v-if="drawerWidth === 64">
                  <v-list-item-icon>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-bind="attrs"
                          v-on="on"
                          v-text="subItem.icon"
                        />
                      </template>
                      <span>{{ subItem.title }}</span>
                    </v-tooltip>
                  </v-list-item-icon>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title v-text="subItem.title" />
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
                    <v-icon v-bind="attrs" v-on="on" v-text="item.icon" />
                  </template>
                  <span>{{ item.title }}</span>
                </v-tooltip>
              </v-list-item-icon>
              <v-list-item-content v-if="drawerWidth !== 64">
                <v-list-item-title v-text="item.title" />
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
export default {
  name: "defaultMenuFull",
  data: () => ({
    tabs: [],
    drawerWidth: 256,
    localeText: navigator.language,
    drawer: true,
    mini: false,
    availableLanguages: [],
    profileMenus: [],
    items: [
      {
        icon: "mdi-view-dashboard",
        title: "Tableau de bord",
        path: "/admin/dashboard/"
      },
      {
        icon: "mdi-lock",
        title: "Permissions",
        path: "",
        children: [
          {
            title: "Page de permissions",
            path: "/admin/permissions"
          },
          {
            title: "Directive de permissions",
            path: "/admin/directive-permission"
          },
          {
            title: "Rôles",
            path: "/admin/roles"
          }
        ]
      },
      {
        icon: "mdi-chart-bar",
        title: "Mes graphiques",
        path: "/admin/graphiques"
      },
      { icon: "mdi-trophy", title: "Tournois", path: "/admin/tournaments" },
      { icon: "mdi-controller-classic", title: "Jeux", path: "/admin/games" },
      {
        icon: "mdi-desktop-classic",
        title: "Platformes",
        path: "/admin/platforms"
      },
      { icon: "mdi-users", title: "Utilisateur", path: "/admin/users" },
      { icon: "mdi-home", title: "Retour au site", path: "/" }
    ]
  }),
  methods: {
    close(tab) {
      const indexTab = this.tabs.findIndex(el => el.path === tab.path);
      // remove closed tab from array
      this.tabs.splice(indexTab, 1);
      // Then, we go in prev elem path
      if (this.tabs[indexTab - 1]) {
        this.$router.push(this.tabs[this.tabs.length - 1].path);
      } else {
        this.$router.push("/admin/dashboard");
      }
    }
  },
  watch: {
    $route(to, from) {
      const elemExist = this.tabs.findIndex(tab => tab.path == to.path);
      if (elemExist !== -1) return;
      this.tabs.push(to);
    }
  },
  created() {
    this.tabs.push(this.$router.currentRoute);
  
  }
};
</script>
