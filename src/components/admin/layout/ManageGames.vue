<template>
  <v-container>
    <v-skeleton-loader v-if="loaded == false" type="table"></v-skeleton-loader>
    <v-data-table
      v-else
      locale="fr-FR"
      :headers="headers"
      :items="games"
      item-key="name"
      sort-by="name"
      class="elevation-1"
      :search="search"
      :expanded.sync="expanded"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Jeux</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="addItem">
            Ajouter
          </v-btn>
          <v-dialog persistent v-model="dialog" max-width="500px">
            <v-form ref="gameEdit">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          autofocus
                          v-model="editedItem.name"
                          label="Nom du jeu"
                          :rules="requiredRules"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          prepend-inner-icon="mdi-magnify"
                          v-model="editedItem.platformsAvalaible"
                          :items="platforms"
                          item-text="name"
                          item-value="id"
                          outlined
                          no-data-text="Aucun résultats"
                          label="Platformes disponibles"
                          clearable
                          multiple
                          required
                          :rules="requiredRules"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12">
                        <!-- <v-file-input
                          v-model="editedItem.thumbnail_path"
                          show-size
                          small-chips
                          truncate-length="15"
                          label="Photo"
                        ></v-file-input> -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Annuler
                  </v-btn>
                  <v-btn color="green" text @click="save" type="submit">
                    Valider
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm(editedItem)"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          append-icon="mdi-magnify"
          v-model="search"
          label="Rechercher"
          class="mx-4"
          single-line
          hide-details
        ></v-text-field>
      </template>

      <template v-slot:[`item.platforms`]="{ item }">
        <span v-if="item.platforms.length === 1"
          >{{ item.platforms.map(g => g.name).toString() }}
        </span>
        <span v-else>{{ item.platforms.map(g => g.name).join(", ") }} </span>
      </template>

      <template v-slot:[`item.gamesMode`]="{ item }">
        <span v-if="item.gamesMode.length === 1"
          >{{ item.gamesMode.map(g => g.name).toString() }}
        </span>
        <span v-else>{{ item.gamesMode.map(g => g.name).join(", ") }} </span>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Rafraichir </v-btn>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <ul>
            <li>
              Créer par {{ item.createdBy }} le
              {{ new Date(item.createdAt).toLocaleString() }}
            </li>
            <li>
              <span v-if="item.updatedAt && item.updatedBy">
                Dernière modification par {{ item.updatedBy }} le
                {{ new Date(item.updatedAt).toLocaleString() }}
              </span>
              <span v-else>Aucune modification depuis la création.</span>
            </li>
          </ul>
        </td>
      </template>
    </v-data-table>

    <v-snackbar v-model="alert" :color="this.alertColor">
      {{ this.alertMsg }}

      <template v-slot:action="{ attrs }">
        <v-btn :color="closeColor" icon v-bind="attrs" @click="alert = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    alert: false,
    alertMsg: "",
    alertColor: "black",
    closeColor: "red",
    search: "",
    dialog: false,
    dialogDelete: false,
    expanded: [],
    loaded: false,
    headers: [
      {
        text: "Nom",
        align: "start",
        value: "name"
      },
      {
        text: "Mode(s) de jeux disponible",
        value: "gamesMode",
        dataType: "String"
      },
      {
        text: "Platforme(s) disponible(s)",
        value: "platforms",
        dataType: "String"
      },
      { text: "Chemin photo", value: "thumbnail_path", dataType: "String" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    platforms: [],
    games: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      thumbnail_path: null,
      createdBy: "",
      createdAt: "",
      updatedBy: "",
      updatedAt: "",
      platformsAvalaible: []
    },
    defaultItem: {
      id: "",
      name: "",
      thumbnail_path: "",
      createdBy: "",
      createdAt: "",
      updatedBy: "",
      updatedAt: "",
      platformsAvalaible: []
    },
    requiredRules: [v => !!v || "Champs requis."]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Ajoute un jeu" : "Modifie le jeu";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      const _this = this;
      this.$http(`/game`)
        .then(res => {
          _this.games = res.data;
          _this.loaded = true;
        })
        .catch(err => {
          _this.alertColor = "red";
          _this.closeColor = "black";
          _this.alert = true;
          _this.alertMsg = err.message;

          console.error(err.errorThrow);
        });
    },

    addItem() {
      if (this.platforms.length === 0) {
        this.$http("/platform")
          .then(res => {
            this.platforms = res.data;
            this.dialog = true;
          })
          .catch(err => console.error(err));
      } else {
        this.dialog = true;
      }
    },

    editItem(item) {
      if (this.platforms.length === 0) {
        this.$http("/platform")
          .then(res => {
            this.platforms = res.data;
            // this.editedIndex = this.platforms.indexOf(item);
            // item.platform = item.platform.map((game) => game.id);
            // this.editedItem.platformsAvalaible = item.platforms;
            this.dialog = true;
          })
          .catch(err => console.error(err));
      } else {
        this.editedIndex = this.platforms.indexOf(item);
        // item.platform = item.platform.map((game) => game.id);
        this.editedItem.platformsAvalaible = item.platforms;
        this.dialog = true;
      }
    },

    deleteItem(item) {
      this.editedIndex = this.platforms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(item) {
      const _this = this;
      const index = this.editedIndex;
      this.$http
        .delete(`/game/${item.id}`)
        .then(res => {
          _this.alertColor = "green";
          _this.closeColor = "black";
          _this.alert = true;
          _this.alertMsg = res.data.message;

          _this.platforms.splice(index, 1);
          console.log(res);
        })
        .catch(err => {
          _this.alertColor = "red";
          _this.closeColor = "black";
          _this.alert = true;
          _this.alertMsg = err.message;

          console.error(err);
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.gameEdit.reset();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (!this.$refs.gameEdit.validate()) return;
      const author = JSON.parse(localStorage.getItem("user")).username;
      const _this = this;
      const index = this.editedIndex;
      if (this.editedIndex > -1) {
        this.editedItem.updatedBy = author;
        this.$http
          .put(`/game/${this.editedItem.id}`, this.editedItem)
          .then(res => {
            _this.alertColor = "green";
            _this.closeColor = "black";
            _this.alert = true;
            _this.alertMsg = res.data.message;
            // On fusionne l'objet avec la nouvelle modif pour éviter de tout refresh
            Object.assign(_this.games[index], res.data.values);
          })
          .catch(err => console.error(err));
      } else {
        this.editedItem.createdBy = author;
        this.$http
          .post(`/game/create`, this.editedItem)
          .then(res => {
            _this.alertColor = "green";
            _this.closeColor = "black";
            _this.alert = true;
            _this.alertMsg = res.data.message;

            _this.games.push(res.data.values);
          })
          .catch(err => {
            console.error(err);
            _this.alertColor = "red";
            _this.closeColor = "black";
            _this.alert = true;
            _this.alertMsg = err.message;
          });
      }
      this.close();
    }
  }
};
</script>

<style></style>
