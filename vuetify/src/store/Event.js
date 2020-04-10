import Vue from "../plugins/resource";
import {
  EventResource,
} from "../plugins/resource";
import { obj2slug } from "../plugins/utils";

function createLink(obj){
  obj.link = {name:"account", params:{slug:obj2slug(obj, 'full_name')}}
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
      let items = [
        {
          id: 1,
          type:"NEW_SHOP",
          what:{
            _type: "Shop",
            id: "1",
            name: "Floristeria Jimenez",
            image: {
              url: "/img/static/shop1.jpg"
            }
          },
          createdAt:"2020-04-10T15:29:26.930Z"
        },
        {
          id: 2,
          type:"NEW_SHOP",
          what:{
            _type: "Shop",
            id: "1",
            name: "Farmacia Gonzalez",
            image: {
              url: "/img/static/shop2.jpg"
            }
          },
          createdAt:"2020-04-10T15:29:26.930Z"
        },
        {
          id: 3,
          type:"NEW_SHOP",
          what:{
            _type: "Shop",
            id: "1",
            name: "Carnisseria de la Esquina",
            image: {
              url: "/img/static/shop3.jpg"
            }
          },
          createdAt:"2020-04-10T15:29:26.930Z"
        },
      ]
      context.commit("ADD", items)
    return;
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

        let response = (await EventResource.get(query)).body
        let items = response.results

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
