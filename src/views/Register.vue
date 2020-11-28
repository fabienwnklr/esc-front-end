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
                        <v-card-title>Inscription</v-card-title>
                    </v-img>

                    <v-form v-model="valid" ref="registerForm">
                        <v-card-text class="text--primary">
                            <v-text-field
                                v-model="username"
                                :rules="[rules.required]"
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

                            <v-text-field
                                v-model="passwordConfirm"
                                :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, passwordConfirmationRule]"
                                :type="showConfirm ? 'text' : 'password'"
                                name="password-confirm"
                                label="Confirmation du mot de passe"
                                counter
                                @click:append="showConfirm = !showConfirm"
                            ></v-text-field>

                            <v-checkbox
                                v-model="checkbox"
                                :rules="[rules.required]"
                                label="J'accepte les CGU"
                                required
                                color="primary"
                            ></v-checkbox>
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                :disabled="!valid || loading"
                                color="success"
                                class="mr-4"
                                :loading="loading"
                                v-on:click="register"
                                type="submit"
                            >S'inscrire</v-btn>
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
        username: "John",
        email: "john@doe.fr",
        emailRules: [
            (value) => !!value || "Champs requis",
            (value) => /.+@.+\..+/.test(value) || "E-mail invalide",
        ],
        checkbox: false,
        show: false,
        showConfirm: false,
        password: null,
        passwordConfirm: null,
        rules: {
            required: (value) => !!value || "Champs requis.",
        },
    }),
    computed: {
        passwordConfirmationRule() {
            return () =>
                this.password === this.passwordConfirm ||
                "Mot de passe différent.";
        },
    },
    methods: {
        resetProp() {
            this.alert = null;
            this.snackbar = false;
            this.loading = false;
        },
        register() {
            const _this = this;
            if (this.valid) {
                this.resetProp();
                this.loading = true;
                this.$http
                    .post("/user/register", {
                        username: this.username,
                        email: this.email,
                        password: this.password,
                    })
                    .then((result) => {
                        console.log(result);
                        localStorage.setItem(
                            "user",
                            JSON.stringify(result.data.user)
                        );
                        localStorage.setItem("jwt", result.data.token);
                        if (result.data.token != null) {
                            this.$emit("loggedIn");
                            if (this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl);
                            } else {
                                this.$router.push("/");
                            }
                             _this.$http.defaults.headers.Authorization = `Bearer ${result.data.token}`;
                        }
                    })
                    .catch((err) => console.info(err));
            }
        },
    },
};
</script>

<style language="css">
</style>
