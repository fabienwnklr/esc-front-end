<template>
  <v-container fluid>
    <v-alert dismissible v-if="alert != null" :type="alert.type">{{alert.label}}.</v-alert>
    <v-row>
      <v-col cols="12" class="mx-auto" lg="6">
        <v-card>
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Inscription</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <v-form v-model="valid">
              <v-text-field
                v-model="username"
                :rules="usernameRules"
                label="Nom d'utilisateur"
                name="username"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                name="email"
                required
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

              <!-- <v-text-field
                  v-model="passwordConfirm"
                  :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required]"
                  :type="showConfirm ? 'text' : 'password'"
                  name="input-10-1"
                  label="Confirmation du mot de passe"
                  counter
                  @click:append="showConfirm = !showConfirm"
              ></v-text-field>-->

              <v-checkbox
                v-model="checkbox"
                :rules="[v => !!v || 'You must agree to continue!']"
                label="J'accepte les CGU"
                required
                color="primary"
              ></v-checkbox>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">S'inscrire</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: null,
    valid: false,
    username: "",
    usernameRules: [v => !!v || "Nom d`utilisateur requis"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail requis"
    ],
    checkbox: false,
    show: false,
    showConfirm: false,
    password: null,
    passwordConfirm: null,
    rules: {
      required: value => !!value || "Mot de passe requis."
    }
  }),

  methods: {
    validate() {
      if (this.valid) {
        this.$http
          .post(this.$serverUrl + "/register", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(result => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (this.$route.params.nextUrl != null) {
                this.$router.push(this.$route.params.nextUrl);
              } else {
                this.$router.push("/");
              }
            }
          })
          .catch(err => Promise.reject(err.response.data.detail));
      }
    }
  }
};
</script>

<style language="css">
</style>
