<template>
  <div>
    <span style="display: none"></span>
    <h1 class="text-center ma-10">Admin dashboad</h1>

    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <v-card color="basil" flat>
          {{ tab.component }}
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import ManageGame from '../../components/admin/ManageGames'
export default {
  component: {
    ManageGame
  },
  data: () => ({
    tab: null,
    items: [
      { title: "Gérer les jeux", component: ManageGame },
      { title: "Gérer les plateformes", component: "" },
      { title: "Gérer les tournois", component: "" },
      { title: "Gérer les utilisateurs", component: "" },
    ],
  }),
};
</script>

<style>
</style>
