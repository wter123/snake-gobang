 //store.js中
 import Vue from 'vue'
 import Vuex from 'vuex'
 import * as view_index from './view/index.js'
 Vue.use(Vuex)



 export default new Vuex.Store({
     modules: {
         loginVuex: view_index.loginVuex
     }
 })