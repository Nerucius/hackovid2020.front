<style>
  /* Global Styles */

  ::-webkit-scrollbar {
      width: 0.65em;
  }

  ::-webkit-scrollbar-track {
    margin-top: -1px;
    background: rgb(12, 77, 77);
      /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
  }

  ::-webkit-scrollbar-thumb {
    background:#00796b;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }

  #toast-container {padding-top: 10px}
  .v-snack { padding-top: 10px; }
</style>

<style scoped>
  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.1s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>


<template>
  <v-app :[theme]="true">
    <template v-if="loading">
      <v-content>
        <v-container fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 class="text-xs-center">
              <v-btn fab large outline loading />
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>

    <template v-else>
      <!-- Navigation Drawer -->
      <NavigationDrawer
        v-if="shouldShowNavigation"
        ref="navigationDrawer"
      />
      <Toolbar
        ref="toolbar"
        :show-toggle-drawer="shouldShowNavigation"
        @toggleDrawer="toggleDrawer()"
      />
      <!-- Content -->
      <v-content>
        <v-container pa-0 fill-height>
          <!-- Main Content Area -->
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view :key="routePathKey" />
          </transition>
          <!-- /Main Content Area -->
        </v-container>

        <!-- Footer Area -->
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <Footer />
            </v-flex>
          </v-layout>
        </v-container>
        <!-- /Footer Area -->

        <!-- Snackbars -->
        <v-snackbar
          v-for="toast in toasts"
          :key="toast.key"
          v-model="toast.active"
          auto-height
          top
          :color="toast.color"
          :timeout="toast.timeout"
          style="z-index:999999"
        >
          <span v-html="toast.message" />
          <v-btn dark flat fab @click="toast.close()">
            <v-icon>close</v-icon>
          </v-btn>
        </v-snackbar>
        <!-- /Snackbars -->
      </v-content>

      <!-- Cookie Policy Toast -->
      <CookieToast />
    </template>
  </v-app>
</template>

<script>
import NavigationDrawer from "@/components/NavigationDrawer";
import CookieToast from "@/components/CookieToast";
import Toolbar from "@/components/Toolbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    CookieToast,
    NavigationDrawer,
    Toolbar,
    Footer,
  },

  metaInfo() {
    return {
      title: this.$t('app.name'),
      titleTemplate: `%s | ${this.$t('app.name')}`,
    }
  },

  data() {
    return {
      loading: true,
      active: true,
    };
  },

  computed: {
    toasts(){
      return this.$store.getters['toast/all']
    },
    theme() {
      return this.$store.getters["preferences/theme"];
    },
    shouldShowNavigation(){
      return this.$store.getters['user/isLoggedIn']
    },
    routePathKey(){
      // Returns a usable fullRoute key without the hash to use as in-page state
      return this.$route.fullPath.replace(/#.*/gi, '')
    }
  },

  async created() {
    // Block on the user status before allowing to show the app
    // try{
     this.$store.dispatch("user/loadCurrent");
    // }catch(error){
      // this.$store.dispatch("toast/error", {message: 'Failed to login', error})
    // }
    this.loading = false;
  },

  methods: {
    toggleDrawer() {
      this.$refs.navigationDrawer.toggleDrawer();
    }
  }
};
</script>
