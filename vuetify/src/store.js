import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Local Stores
import preferences from "./store/Preferences";
import toast from "./store/Toast"

// API stores
import user from "./store/User";
import event from "./store/Event";
import shop from "./store/Shop";


// CRUD Models

// Create Store
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    preferences,
    toast,
    user,
    event,
    shop
  }
});
