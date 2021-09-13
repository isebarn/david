<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <template #activator="{ on, attrs }">
      <v-btn
        text
        block
        v-bind="attrs"
        v-on="on"
      >
        New Label
        <v-spacer />
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>New Label</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="title"
          name="title"
          label="new title"
        />
        <v-card-subtitle>Label color</v-card-subtitle>
        <v-color-picker
          v-model="color"
          dot-size="25"
          hide-canvas
          hide-inputs
          hide-sliders
          show-swatches
          :swatches="swatches"
          swatches-max-height="200"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="newType()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  data () {
    return {
      title: '',
      color: null,
      dialog: false,
      swatches: [
        [
          '#FFC0C0',
          '#FFE6E6',
          '#FFD3D3',
          '#FFADAD',
          '#FF9A9A'
        ],
        [
          '#FFDDC0',
          '#FFF1E6',
          '#FFE7D3',
          '#FFD2AD',
          '#FFC89A'
        ],
        [
          '#B0E9E9',
          '#E2FBFB',
          '#C9F3F3',
          '#95DCDC',
          '#7BCCCC'
        ],
        [
          '#B8F4B8',
          '#E4FDE4',
          '#CEF9CE',
          '#A1EEA1',
          '#8BE68B'
        ]
      ]

    }
  },

  methods: {
    ...mapActions('kanban', ['addType']),

    newType () {
      this.addType({ title: this.title, color: this.color.hex })
      this.dialog = false
    }
  }
}
</script>
