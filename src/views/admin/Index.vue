<template>
  <main>
    <h1 class="text-center ma-10">Admin dashboad</h1>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="(item, i) in tabs" :key="i">
        {{ item.title }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, i) in tabs" :key="i">
        <v-card color="basil" flat>
          <component v-bind:is="item.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </main>
</template>

<script>
import ManageGames from "../../components/admin/ManageGames.vue";
import ManageGamesMode from "../../components/admin/ManageGamesMode.vue";
import ManageTournaments from "../../components/admin/ManageTournaments";
import ManagePlatforms from "../../components/admin/ManagePlatforms";
import ManageUsers from "../../components/admin/ManageUsers";

export default {
  components: { ManageGames, ManageGamesMode, ManageTournaments, ManagePlatforms, ManageUsers },
  data: () => ({
    tab: null,
    tabs: [
      { title: "Gérer les jeux", component: "manage-games" },
      { title: "Gérer les modes de jeux", component: "manage-games-mode" },
      { title: "Gérer les plateformes", component: "manage-platforms" },
      { title: "Gérer les tournois", component: "manage-tournaments" },
      { title: "Gérer les utilisateurs", component: "manage-users" },
    ],
  }),
};
</script>

<style>
</style>
