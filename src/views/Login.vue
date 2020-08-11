<template>
  <v-container fluid>
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

          <v-card-text class="text--primary">
            <v-form v-model="valid">
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
                name="input-10-1"
                label="Mot de passe"
                counter
                @click:append="show = !show"
              ></v-text-field>

              <v-checkbox v-model="checkbox" label="Se souvenir de moi" color="primary"></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Log in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    checkbox: false,
    show: false,
    password: null,
    rules: {
      required: value => !!value || "Required."
    }
  }),

  methods: {
    validate() {
      console.log(this);
      if (this.valid) {
        this.$http
          .post(this.$serverUrl + "/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            let is_admin = response.data.user.is_admin
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", JSON.stringify(response.data.token));

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                if (is_admin == 1) {
                  this.$router.push("/admin");
                } else {
                  this.$router.push("/");
                }
              }
            }
          })
          .catch(err => {
            this.alert = err;
            console.error(err);
          });
      }
    }
  }
};
</script>

<style language="css">
</style>
