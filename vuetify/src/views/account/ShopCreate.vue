<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-card flat>
          <v-card-title>
            <h3>{{ $t('pages.shopCreate.title') }}</h3>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="shop.name"
              :rules="[rules.required]"
              counter="100"
              maxlength="100"
              :label="$t('forms.fields.name')"
            />
            <v-text-field
              v-model="shop.description"
              :rules="[rules.required]"
              :label="$t('forms.fields.description')"
            />
            <br>
            <div id="shopMap" style="width: 100%; height: 200px" />
            <small>{{shopMapLabel}}</small>
            <v-text-field
              v-model="shop.streetName"
              :rules="[rules.required]"
              @change="searchStreet"
              :label="$t('forms.fields.streetName')"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-flex shrink>
              <v-btn type="submit" depressed color="success">Registrar</v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
// import
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();

export default {
  data() {
    return {
      valid: null,
      shopMap : null,
      shopMapMarker: null,
      shopMapLabel: "",
      shop: {
        // coverImageId: 0,
        // coverImage: 0,
        // latitude: 0,
        // longitude: 0,
        // streetName: "string",
        shopCategoryIds: [],
        shopImageIds: []
      },
      rules: {
        required: v => !!v || this.$t("forms.rules.requiredField"),
        isUser: v => this.isUser(v) || this.$t("forms.rules.mustBeUser"),
        isURL: v => regexIsURL(v) || this.$t("forms.rules.mustBeURL"),
        isEmail: v => regexIsEmail(v) || this.$t("forms.rules.mustBeEmail")
      }
    };
  },

  computed: {
    user() {
      return this.$store.getters["user/current"];
    },
  },

  async mounted() {

    this.shopMap = L.map('shopMap').setView([41.3839254,2.156953], 16);
    this.shopMap.dragging.disable();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.shopMap);

    navigator.geolocation.getCurrentPosition(pos =>{
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      shopMap.setView([lat, lon], 15);
    }, error => {} );

  },

  methods: {
    async searchStreet(){
      if(!this.shop.streetName){ return }

      // Call search api
      let results = await provider.search({ query: this.shop.streetName });
      if(results.length == 0){
        this.$store.dispatch('toast/error', {message: "No s'ha trobat la direcció"})
      }
      let target = results[0]

      this.shopMapLabel = target.label
      // Clear previous Marker
      if(this.shopMapMarker){ this.shopMap.removeLayer(this.shopMapMarker) }
      // Create marker at lat lon and center map
      this.shopMapMarker = L.marker([target.y, target.x]).addTo(this.shopMap);
      this.shopMap.setView([target.y, target.x], 18)
    },
    submit() {
      if (this.$refs.form.validate()) {
        console.log("valid-form");
        this.shop.ownerId = this.user.id;
        console.log(this.shop);

        this.$store.dispatch("toast/error", {
          message: "La api esta rota LOLOL"
        });
      }
    }
  }
};
</script>

<style>
</style>
