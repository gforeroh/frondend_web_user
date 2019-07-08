<template>
  <form>
    <v-text-field
      v-model="name"
      v-validate="'required|max:15'"
      :counter="15"
      :error-messages="errors.collect('name')"
      label="Name"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      v-validate="'required|email'"
      :error-messages="errors.collect('email')"
      label="E-mail"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-select
      v-model="select"
      v-validate="'required'"
      :items="items"
      :error-messages="errors.collect('select')"
      label="Select"
      data-vv-name="select"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      v-validate="'required'"
      :error-messages="errors.collect('checkbox')"
      value="1"
      label="Option"
      data-vv-name="checkbox"
      type="checkbox"
      required
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>
<script>
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
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: null,
      dictionary: {
        attributes: {
          // email: 'E-mail Address'
          // name: 'Nombre',
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

    mounted () {
      this.$validator.localize('es', this.dictionary)
    },

    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.reset()
      }
    }
  }
</script>