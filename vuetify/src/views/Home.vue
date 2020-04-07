<template>
  <v-layout row wrap align-content-start>

    <v-flex xs12>

        <v-card>
          <v-card-title>
            Platform
          </v-card-title>
          <v-card-text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur harum ipsam at libero, perferendis quae quam eaque repellat laboriosam eum in iste distinctio laudantium ex dolores sed voluptas. Laboriosam doloribus quaerat repellendus quia consequatur ipsam temporibus soluta nostrum odio ducimus, cupiditate laborum deleniti excepturi enim reprehenderit consequuntur obcaecati distinctio exercitationem hic pariatur. Sit quisquam iure veniam sapiente dolores excepturi ab id, quis consectetur quasi magni totam sed vel? Repellat odit assumenda a rerum porro minus autem? Iure provident vitae eum nihil, ad odit aliquam ipsam ipsum temporibus aperiam. Temporibus, adipisci! Nesciunt quod voluptatibus odio facilis amet enim, cumque facere ratione.
          </v-card-text>
        </v-card>

    </v-flex>

  </v-layout>
</template>

<script>
// import { GeoJSONCountries } from "@/plugins/i18n";
// import { GeoJSONCountriesDetail, Countries } from "@/plugins/i18n";

export default {
  components: {
  },

  data() {
    return {
    };
  },

  computed: {
  },

  async created(){
  },

  methods: {


    // TODO: Repurpose map code
    // createMap(){
    //   function getColor (value) {
    //     return `rgba(0,121,107,${value * .9 / maxProjectPerCountry})`;
    //   }
    //   function style(feature) {
    //       return {
    //           fillColor: getColor(feature.properties.project_count),
    //           weight: 2,
    //           opacity: 1,
    //           color: 'white',
    //           fillOpacity: 1
    //       };
    //   }
    //   let _this = this
    //   function onEachFeature(feature, layer){
    //     layer.on({
    //         click: _this.clickOnCountry
    //     });
    //   }
    //   let mapUrlWatercolor = 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
    //   let mapUrlOficial = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //   this.worldMap = L.map('world-map',{
    //     maxBounds: [ [80,  -180], [-70, 180] ],
    //     zoomControl: false,
    //     zoom: 2,
    //     minZoom:2,
    //     maxZoom:5,
    //     center: {lat: 30, lon:0}
    //   })
    //   L.tileLayer(mapUrlWatercolor, {
    //       attribution: `
    //         <small>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>
    //         | &copy; <a href="http://maps.stamen.com">Stamen Design</a></small>`
    //   }).addTo(this.worldMap);
    //   L.geoJson(GeoJSONCountriesDetail, {style, onEachFeature}).addTo(this.worldMap);
    // },
    // async clickOnCountry({target}){
    //   // zoom on region
    //   // this.worldMap.fitBounds(target.getBounds());
    //   let feature = target.feature
    //   let country_code = feature.properties.ISO_A3
    //   let countryItem = Countries.filter(c => c.alpha3Code == country_code)[0]
    //   let countryLocaleName = countryItem.translations[this.$i18n.locale]
    //   // Set country name
    //   this.countryFilter = feature.properties.NAME
    //   if(countryLocaleName){
    //     this.countryFilter = countryLocaleName
    //   }
    //   this.countryFilterProjects = await this.$store.dispatch("project/search", {country_code})
    //   this.countryFilterProjects.sort( (a,b) => { return a.name.localeCompare(b.name) })
    // }


  }
};
</script>
