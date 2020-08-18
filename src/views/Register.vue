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
                        <v-btn
                            :disabled="!valid || loading"
                            color="success"
                            class="mr-4"
                            :loading="loading"
                            @click="validate"
                        >S'inscrire</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        snackbar: false,
        alert: null,
        valid: false,
        loading: false,
        username: "",
        usernameRules: [(v) => !!v || "Nom d`utilisateur requis"],
        email: "",
        emailRules: [
            (value) => !!value || "E-mail is required",
            (value) => /.+@.+\..+/.test(value) || "E-mail requis",
        ],
        checkbox: false,
        show: false,
        showConfirm: false,
        password: null,
        passwordConfirm: null,
        rules: {
            required: (value) => !!value || "Mot de passe requis.",
        },
    }),

    methods: {
        resetProp() {
            this.alert = null;
            this.snackbar = false;
            this.loading = false;
        },
        validate() {
            if (this.valid) {
                this.$http
                    .post(this.$serverUrl + "/users/register", {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    })
                    .then((result) => {
                      console.log(result)
                        localStorage.setItem(
                            "user",
                            JSON.stringify(result.data.user)
                        );
                        localStorage.setItem("jwt", result.data.token);

                        if (localStorage.getItem("jwt") != null) {
                            this.$emit("loggedIn");
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl);
                            } else {
                                this.$router.push("/");
                            }
                        }
                    })
                    .catch(
                        (err) => console.info(err)
                    );
            }
        },
    },
};
</script>

<style language="css">
</style>
