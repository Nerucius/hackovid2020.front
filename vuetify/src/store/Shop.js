import Vue from "../plugins/resource";
import {
  ShopResource,
} from "../plugins/resource";
import { obj2slug } from "../plugins/utils";

let Resource = ShopResource;

function createLink(obj){
  obj.id = obj.shopId
  obj.link = {name:"shop", params:{slug:obj2slug(obj, 'name')}}
  return obj
}

export default {
  namespaced: true,

  state: {
    current: null,
    items: {},
  },

  mutations: {
    ADD(state, items){
      let newItems = {}
      items.map(createLink).forEach(i => {newItems[i.id] = i})
      state.items = { ...state.items, ...newItems}
    },

    SET_CURRENT(state, item){
      state.current = item
    }
  },

  actions: {
    load: async function (context, payload={}) {
      if (Array.isArray(payload)){
        // Ids provided, get detailed information on given pids
        let ids = payload
        let items = await Promise.all(ids.map(id => EventResource.get({id})))
        items = items.map(i => i.body)
        context.commit("ADD_DETAIL", items)

      }else{
        // No ids provided, just get list of all
        let params = payload.params || {}
        let query = {...params}

        let response = (await Resource.get(query)).body
        let items = response.shops

        // Iteratively get all pages
        let next = response.next
        while(next){
          response = (await Vue.http.get(next)).body
          items = [...items, ...response.results]
          next = response.next
        }

        context.commit("ADD", items)
      }
    },

  },

  getters: {
    all: state => {
      return Object.values(state.items)
    },

    get: state =>{
      return ( id ) => (state.items[id] || {})
    },
  }
};
