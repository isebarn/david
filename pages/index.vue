<template>
  <v-row justify="center" align="center">
    ad
    <nuxt-content :document="page" />
  </v-row>
</template>
<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('hello').fetch()

    return {
      page
    }
  }
}
</script>
