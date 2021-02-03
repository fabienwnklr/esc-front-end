<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar" :multi-line="true">
      {{ alert }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="12" class="mx-auto" lg="6">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Connexion</v-card-title>
          </v-img>

          <v-form v-model="valid" ref="loginForm">
            <v-card-text class="text--primary">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                aria-autocomplete="true"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
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
                v-on:click="login"
                type="submit"
                >Connexion</v-btn
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
    alert: null,
    snackbar: false,
    loading: false,
    valid: false,
    email: "john@doe.fr",
    password: null,
    emailRules: [
      v => !!v || "E-mail requis.",
      v => /.+@.+\..+/.test(v) || "E-mail invalide"
    ],
    show: false,
    rules: {
      required: v => !!v || "Required."
    }
  }),

  methods: {
    resetProp() {
      this.alert = null;
      this.snackbar = false;
      this.loading = false;
    },
    login() {
      const _this = this;
      if (this.valid) {
        this.resetProp();
        this.loading = true;
        this.$http
          .post("/user/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            let is_admin = response.data.user.is_admin;
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);
            _this.$http.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${response.data.token}`;
            if (response.data.token != null) {
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
              this.$emit("logged");
            }
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.alert = err.response.data.message;
            this.snackbar = true;
          });
      }
    }
  }
};
</script>

<style language="css"></style>
