<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="mx-auto" lg="6">
        <v-card>
          <v-card-title class="bg--primary">Edit profile</v-card-title>

          <v-form v-model="valid" ref="registerForm">
            <v-card-text class="text--primary">
              <v-chip :class="status === 'Admin' ? 'success mb-2' : 'info mb-2'"
                >Status: {{ status }}</v-chip
              >
              <v-text-field
                v-model="username"
                value="toto"
                label="Username"
                name="username"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="password"
                label="New password"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                name="password"
                label="Confirm new password"
                counter
                @click:append="show = !show"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-btn
                timeout="-1"
                :disabled="!valid || loading"
                color="success"
                class="mr-4"
                :loading="loading"
                type="button"
                v-on:click.native="editUserInfos"
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
  methods: {
    editUserInfos() {
      const userInfosBeforeChange = {
        username: this.$store.getters.user.username,
        email: this.$store.getters.user.email,
      };
      const currentInfosUser = { username: this.username, email: this.email };

      if (JSON.stringify(userInfosBeforeChange) === JSON.stringify(currentInfosUser)) {
        if (this.$store.getters.snackbar.show === true) {
          this.$store.dispatch("hideSnackbar").then(() => {
            const showSnackbar = setTimeout(() => {
              this.$store.dispatch("showSnackbar", {
                text: "Aucune données n'a été modifié.",
                color: "warning",
              });
              clearTimeout(showSnackbar);
            }, 300);
          });
        } else {
          this.$store.dispatch("showSnackbar", {
            text: "Aucune données n'a été modifié.",
            color: "warning",
          });
        }
      }
    },
  },
  beforeMount() {
    this.username = this.$store.getters.user.username;
    this.email = this.$store.getters.user.email;
    this.status = this.$store.getters.user.is_admin ? "Admin" : "User";
  },
};
</script>

<style></style>
