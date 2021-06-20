<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mx-auto" lg="6">
        <UserInfos></UserInfos>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserInfos from "../components/user/UserInfos.vue";
export default {
  components: { UserInfos },
  data: () => ({}),
};
</script>

<style></style>
