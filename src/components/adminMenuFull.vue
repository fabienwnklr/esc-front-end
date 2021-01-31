<template>
  <div>
    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click="mini = !mini" />
      <span class="title ml-3 mr-5">{{ this.$webSiteName }}</span>
      <v-icon>mdi-xbox-controller</v-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
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
                        <v-icon v-bind="attrs" v-on="on" v-text="subItem.icon" />
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
    drawerWidth: 256,
    drawer: true,
    mini: false,
    items: [
      { icon: "mdi-view-dashboard", title: "Tableau de bord", path: "/admin/dashboard/" },
      {
        icon: "mdi-lock",
        title: "Permissions",
        path: "",
        children: [
          {
            title: "Page de permissions",
            path: "/admin/permissions",
          },
          {
            title: "Directive de permissions",
            path: "/admin/directive-permission",
          },
          {
            title: "Rôles",
            path: "/admin/roles",
          },
        ],
      },
      { icon: "mdi-chart-bar", title: "Mes graphiques", path: "/admin/graphiques" },
      { icon: "mdi-home", title: "Retour au site", path: "/" },
    ],
  }),
  computed: {},
};
</script>
