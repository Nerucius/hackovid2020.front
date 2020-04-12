<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card flat>
        <v-card-title>
          <h3>{{ $t('pages.myShops.title') }}</h3>
        </v-card-title>
        <!-- Shop List -->
        <v-card-text>
          <v-list v-if="ownShops.length > 0">
            <v-list-tile v-for="shop in ownShops" :key="shop.id">
              <v-list-tile-action>
                <v-icon>store</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Mapa</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <p v-else>
            No tens cap comerci al teu nom. Crea'n un per començar!
          </p>
        </v-card-text>
        <!-- Card actions -->
        <v-card-actions>
          <v-spacer />
          <v-flex shrink>
            <v-btn :to="{name: 'shop-create'}" depressed color="primary">
              Registrar una tenda
            </v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/current"];
    },

    ownShops() {
      let allShops = this.$store.getters["shop/all"];
      return allShops.filter(s => s.userDetailsResponse.userId == this.user.id);
    }
  },

  async mounted() {
    this.$store.dispatch("shop/load");
  }
};
</script>

<style>
</style>
