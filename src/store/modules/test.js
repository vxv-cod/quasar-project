import { createStore } from 'vuex'
import { elem }  from "/public/data/xxx.json"
// import loadRowsHeaders from "/public/data/vxv_Table.json";
import loadRowsHeaders from "/public/data/vxv_Table.json";


export default {
  name: 'test',

  state: {
    counter: elem,
    loadRowsHeaders,
  },
  getters:{
    getCount2(state){
      return state.counter * 2;
    }
  },
  mutations: {
    increment (state, val) {
      // mutate state
      // state.counter++
      state.counter += val
    }
  },
  actions: {
  },
  modules: {
  }

}

