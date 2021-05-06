<template>
  <v-container>
    <v-data-table
      locale="fr-FR"
      :headers="headers"
      :items="users"
      item-key="id"
      sort-by="username"
      class="elevation-1"
      :search="search"
      :expanded.sync="expanded"
      show-expand
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Utilisateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-form ref="userEdit">
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Ajouter
                </v-btn>
              </template> -->
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
                          v-model="editedItem.username"
                          label="Nom d'utilisateur"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Annuler
                  </v-btn>
                  <v-btn color="green" text @click="save" type="submit"> Valider </v-btn>
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
              <span v-if="item.createdAt && item.createdBy">
                Créé par {{ item.createdBy }} le
                {{ new Date(item.createdAt).toLocaleString() }}
              </span>
              <span v-else>
                Créé le {{ new Date(item.createdAt).toLocaleString() }}</span
              >
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
    headers: [
      {
        text: "Nom d'utilisateur",
        align: "start",
        value: "username"
      },
      {
        text: "Admin",
        align: "",
        value: "is_admin"
      },
      { text: "Actions", value: "actions", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      username: "",
      createdBy: "",
      createdAt: "",
      updatedBy: "",
      updatedAt: ""
    },
    defaultItem: {
      id: "",
      username: "",
      createdBy: "",
      createdAt: "",
      updatedBy: "",
      updatedAt: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajoute un utilisateur"
        : "Modifie l'utilisateur";
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
      this.$http(`/user`)
        .then(res => {
          _this.users = res.data;
        })
        .catch(err => {
          _this.alertColor = "red";
          _this.closeColor = "black";
          _this.alert = true;
          _this.alertMsg = err.message;

          console.error(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(item) {
      const _this = this;
      const index = this.editedIndex;
      this.$http
        .delete(`/user/${item.id}`)
        .then(res => {
          _this.alertColor = "green";
          _this.closeColor = "black";
          _this.alert = true;
          _this.alertMsg = res.data.message;

          _this.users.splice(index, 1);
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
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      const author = JSON.parse(localStorage.getItem("user")).username;
      const _this = this;
      const index = this.editedIndex;
      if (this.editedIndex > -1) {
        this.editedItem.updatedBy = author;
        this.$http
          .put(`/user/${this.editedItem.id}`, this.editedItem)
          .then(res => {
            _this.alertColor = "green";
            _this.closeColor = "black";
            _this.alert = true;
            _this.alertMsg = res.data.message;
            // On fusionne l'objet avec la nouvelle modif pour éviter de tout refresh
            Object.assign(_this.users[index], res.data.values);
          })
          .catch(err => console.error(err));
      } else {
        this.$http
          .post(`/user/create`, {
            name: this.editedItem.username,
            createdBy: author
          })
          .then(res => {
            _this.alertColor = "green";
            _this.closeColor = "black";
            _this.alert = true;
            _this.alertMsg = res.data.message;

            _this.users.push(res.data.values);
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
