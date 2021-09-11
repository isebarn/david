<template>
  <v-chip
    :color="`${color} lighten-5`"
    :text-color="`${color}`"
    style="font-weight: bold;"
  >
    <div id="circle" :style="{background:color}" />

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
