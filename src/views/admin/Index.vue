<template>
  <div>
    <span style="display: none"></span>
    <h1 class="text-center ma-10">Admin dashboad</h1>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in tabs" :key="item">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabs" :key="item">
        <v-card color="basil" flat>
          <component v-bind:is="item.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ManageGames from "../../components/admin/ManageGames.vue";
import ManageTournaments from "../../components/admin/ManageTournaments";
import ManagePlatforms from "../../components/admin/ManagePlatforms";
import ManageUsers from "../../components/admin/ManageUsers";

export default {
  components: { ManageGames, ManageTournaments, ManagePlatforms, ManageUsers },
  data: () => ({
    tab: null,
    tabs: [
      { title: "Gérer les jeux", component: "manage-games" },
      { title: "Gérer les plateformes", component: "manage-platforms" },
      { title: "Gérer les tournois", component: "manage-tournaments" },
      { title: "Gérer les utilisateurs", component: "manage-users" },
    ],
  }),
};
</script>

<style>
</style>
