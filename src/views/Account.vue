<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mx-auto" lg="6">
        <v-card>
          <v-card-title class="bg--primary">Edit profile</v-card-title>

          <v-form v-model="valid" ref="registerForm">
            <v-card-text class="text--primary">
              <v-chip :class="status === 'Admin' ? 'success' : 'info'"
                >Status: {{ status }}</v-chip
              >
              <v-text-field
                v-model="username"
                value="toto"
                label="Nom d'utilisateur"
                name="username"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="E-mail"
                name="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="password"
                label="Mot de passe"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                :disabled="!valid || loading"
                color="success"
                class="mr-4"
                :loading="loading"
                type="submit"
                >Edit</v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    valid: true,
    show: false,
    rules: [],
    username: "",
    password: "",
    status: "",
    email: "",
  }),
  beforeMount() {
    this.username = this.$store.getters.user.username;
    this.email = this.$store.getters.user.email;
    this.status = this.$store.getters.user.is_admin ? "Admin" : "User";
  },
};
</script>

<style></style>
