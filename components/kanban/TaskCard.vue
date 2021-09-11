<template>
  <v-card class="shadow rounded px-3 pt-3 pb-4 border border-white">
    <!-- <v-flex class="flex justify-between"> -->
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-wrap" style="font-weight: bold; opacity: 0.8;" v-text="task.title" />
      </v-list-item-content>
      <v-list-item-avatar
        class="w-6 h-6 rounded-full ml-3"
      >
        <v-img src="https://pickaface.net/gallery/avatar/unr_sample_161118_2054_ynlrg.png" />
      </v-list-item-avatar>
    <!-- </v-flex> -->
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <span v-if="task.date" style="color: gray">{{ $moment(task.date).format("MMM, D") }}</span>
      </v-list-item-content>
      <badge v-if="task.type" :color="badgeColor">
        {{ task.type }}
      </badge>
    </v-list-item>
  </v-card>
</template>
<script>
import Badge from './Badge.vue'
export default {
  components: {
    Badge
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    },
    types: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    badgeColor () {
      console.log(this.types)
      console.log(this.task)
      console.log(this.types.filter(x => x.title === this.task.type))

      return this.types.filter(x => x.title === this.task.type).length > 0
        ? this.types.filter(x => x.title === this.task.type)[0].color
        : 'teal'
    }
  }
}
</script>
