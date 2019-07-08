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
              <form>
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                      v-model="editedItem.name" 
                      label="Nombre"
                      
                      v-validate="'required|max:15'"
                      :counter="15"
                      :error-messages="errors.collect('name')"
                      data-vv-name="name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                      v-model="editedItem.lastname" 
                      label="Apellido"

                      v-validate="'required'"
                      :error-messages="errors.collect('lastname')"
                      data-vv-name="lastname"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                      v-model="editedItem.username" 
                      label="Usuario"

                      v-validate="'required'"
                      :error-messages="errors.collect('username')"
                      data-vv-name="username"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                      v-model="editedItem.email" 
                      label="Email"
                      v-validate="'email'"
                      :error-messages="errors.collect('email')"
                      data-vv-name="email"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                      v-model="editedItem.password" 
                      label="Password"

                      v-validate="'required'"
                      :error-messages="errors.collect('password')"
                      data-vv-name="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="submit">Guardar</v-btn>
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
        <td><v-list-tile :to="{ name: 'view', params: { id: props.item.id} }" >{{ props.item.name }}</v-list-tile></td>
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
  import Vue from 'vue'
  import VeeValidate, { Validator, required, email, minLength, sameAs } from 'vee-validate'
  import es from 'vee-validate/dist/locale/es';

  Vue.use(VeeValidate)
  Validator.localize('es', es);
  export default {
    $_veeValidate: {
      validator: 'new'
    },
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
      },
      dictionary: {
          attributes: {
          name: 'Nombre',
          email: 'Correo'
          // custom attributes
          },
          custom: {
          name: {
              // required: () => 'Name can not be empty 4444',
              // required: () => 'El campo nombre no puede ser vacio',
              max: 'The name field may not be greater than 12 characters 2222'
              // custom messages
          },
          select: {
              required: 'Select field is required 1111'
          }
          }
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

      async submit () {
          // this.$validator.validateAll().then((isValid) => {
          // })
          let isValid = await this.$validator.validateAll()
          if (isValid) {
            this.save();
          } 
      },

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
        this.mostrarLoading({titulo: 'Cargando usuarios', color: 'primary'})
        try {
          let data = await axios.get(`${process.env.VUE_APP_API_WEB}/users`)
          this.desserts = await data.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.ocultarLoading()
        }
      }
    },

    mounted () {
      this.$validator.localize('es', this.dictionary)
    },
  }
</script>