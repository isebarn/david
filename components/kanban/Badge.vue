<template>
  <v-chip
    :color="`${badgeColor}`"
    :text-color="`${textColor}`"
    style="font-weight: bold;"
  >
    <div id="circle" :style="{background:textColor}" />

    <span>
      <slot />
    </span>
  </v-chip>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'teal'
    }
  },

  computed: {
    badgeColor () {
      return this.color
    },

    textColor () {
      return this.lightenDarkenColor(this.color, -100)
    }
  },

  methods: {
    lightenDarkenColor (col, amt) {
      let usePound = false

      if (col[0] === '#') {
        col = col.slice(1)
        usePound = true
      }

      const num = parseInt(col, 16)

      let r = (num >> 16) + amt

      if (r > 255) { r = 255 } else if (r < 0) { r = 0 }

      let b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) { b = 255 } else if (b < 0) { b = 0 }

      let g = (num & 0x0000FF) + amt

      if (g > 255) { g = 255 } else if (g < 0) { g = 0 }

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }
  }
}
</script>

<style>
#circle {
  width: 8px;
  height: 8px;
  margin-right: 5px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  opacity: 0.3;
}
</style>
