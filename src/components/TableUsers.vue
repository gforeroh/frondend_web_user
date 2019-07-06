<template>
  <div>
    <v-btn color="success" @click="fillDataTable()">Llenar</v-btn>
    <v-toolbar flat color="white">
      <v-toolbar-title>USUARIOS</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" persistent  max-width="700px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Usuario</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.lastname" label="Apellido"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.username" label="Usuario"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :pagination.sync="pagination"
      class="elevation-1"
      >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.lastname }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.password }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import axios from 'axios'
  import toastr from 'toastr'
  export default {
    data: () => ({
      dialog: false,
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Nombres', value: 'name' },
        { text: 'Apellidos', value: 'lastname' },
        { text: 'Usuario', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Password', value: 'password', sortable: false },
        {
          text: 'Acciones',
          align: 'center',
          sortable: false,
          value: 'id'
        },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      },
      defaultItem: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo usuario' : 'Editar usuario'
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      ...mapMutations(['mostrarLoading', 'ocultarLoading']),
      initialize () {
        this.fillDataTable()
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      async deleteItem (item) {
        const id = item.id;
        const index = this.desserts.indexOf(item)

        if(confirm("Are you sure you want to delete this item?")){
          this.mostrarLoading({titulo: 'Eliminado usuarios', color: 'error'})
          try {
            let response = await axios.delete(`${process.env.VUE_APP_API_WEB}/users/${id}`)
            let status = await response.status;
            if(status == '204'){
              this.desserts.splice(index, 1)
              toastr.success('El usuario se eliminó correctamente');
            } else {
              toastr.error('Error');
            }            
          } catch (error) {
            console.log(error);
          } finally {
            this.ocultarLoading()
          }
          
        }
        
        
        
        // confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      async save () {
        if (this.editedIndex > -1) {
          // let nose = Object.assign(this.desserts[this.editedIndex], this.editedItem)
          const id = this.editedItem.id
          
          this.mostrarLoading({titulo: 'Actualizando usuario', color: 'primary'})
          try {
            let response = await axios.put(`${process.env.VUE_APP_API_WEB}/users/${id}`, this.editedItem)
            // this.initialize()
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            toastr.success('Usuario actualizado correctamente');
          } catch (error) {
            console.log(error);
          } finally {
            this.ocultarLoading()
          }
          
        } else {
          // this.desserts.push(this.editedItem)
          this.mostrarLoading({titulo: 'Guardando usuario', color: 'primary'})
          try {
            let response = await axios.post(`${process.env.VUE_APP_API_WEB}/users`, this.editedItem)
            toastr.success('Usuario guardado correctamente');
            this.initialize()
          } catch (error) {
            console.log(error);
          } finally {
            this.ocultarLoading()
          }
        }
        this.close()
      },

      async fillDataTable(){
        this.mostrarLoading({titulo: 'Cargando usuarios', color: 'warning'})
        try {
          let data = await axios.get(`${process.env.VUE_APP_API_WEB}/users`)
          this.desserts = await data.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.ocultarLoading()
        }
      }
    }
  }
</script>