<template>
  <v-data-table
    :headers="headers"
    :items="games"
    item-key="name"
    sort-by="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:[`item.createdAt`]="{ item }">
      <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
    </template>
    <template v-slot:[`item.updatedAt`]="{ item }">
      <span>{{ new Date(item.updatedAt).toLocaleString() }}</span>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Mes jeux</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Ajouter
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nom du jeu"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="editedItem.imgUrl"
                      show-size
                      small-chips
                      truncate-length="15"
                      label="Photo"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
              <v-btn color="green" text @click="save"> Valider </v-btn>
            </v-card-actions>
          </v-card>
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
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nom",
        align: "start",
        value: "name",
      },
      { text: "Chemin photo", value: "imgUrl", dataType: "String" },
      { text: "Création", value: "createdAt", dataType: "Date" },
      { text: "Par", value: "author", dataType: "String" },
      { text: "Dernière modification", value: "updatedAt", dataType: "Date" },
      { text: "Par", value: "author", dataType: "String" },
      { text: "Actions", value: "actions" },
    ],
    games: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      pathPicture: "",
      created: new Date(),
      lastEdit: new Date(),
    },
    defaultItem: {
      id: "",
      name: "",
      pathPicture: "",
      created: new Date(),
      lastEdit: new Date(),
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Ajoute un jeu" : "Modifie le jeu";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$http
        .get(`${this.$serverUrl}/games`)
        .then((res) => (this.games = res.data))
        .catch((err) => console.error(err));
    },

    editItem(item) {
      this.editedIndex = this.games.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.games.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm(item) {
      this.$http
        .delete(`${this.$serverUrl}/games/${item.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
      this.closeDelete();
      this.initialize();
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

      if (this.editedIndex > -1) {
        this.$http
          .put(
            `${this.$serverUrl}/games/${this.editedItem.id}`,
            this.editedItem
          )
          .then((res) => {
            this.initialize();
          })
          .catch((err) => console.error(err));
      } else {
        this.$http
          .post(
            `${this.$serverUrl}/games/create`,
            {
              name: this.editedItem.name,
              author: author,
            },
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          )
          .then((res) => {
            this.initialize();
          })
          .catch((err) => {
            console.error(err);
          });
      }
      this.close();
    },
  },
};
</script>

<style>
</style>