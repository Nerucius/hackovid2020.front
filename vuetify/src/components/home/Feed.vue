<template>
  <v-layout row wrap>
    <v-flex v-for="event in eventFeed" :key="event.id" xs12>
      <v-card elevation="0">
        <v-img :src="event.what.image.url" />
        <v-card-text>
          <h2 class="mb-2">
            {{ event.what.name }}
          </h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ducimus doloremque maxime enim dolorum, voluptates deleniti est iusto velit amet perspiciatis ea harum facere debitis eius ab consequuntur, illo blanditiis?
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    eventFeed() {
      return this.$store.getters["event/all"];
    }
  },

  async mounted() {
    await this.$store.dispatch("event/load");
  }
};
</script>

<style>
</style>
