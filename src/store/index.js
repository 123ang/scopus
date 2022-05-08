import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   
    host_url: "https://analysisbursa.com/",
    is_login: false,
    remember_boolean: false,
    remember_password: "",
    remember_username: "",
    script_url:  "php_script/scopus/scopus/",
    user_id: "",
    username: "",
    user_group: ""
  },
  getters: {
    
  },
  mutations: {
    
    HostUrl(state,host_url) {
      state.host_url = host_url
    },
    IsLogin(state, is_login) {
      state.is_login = is_login
    },
    ScriptUrl(state,script_url) {
      state.script_url = script_url
    },
    Username(state, data) {
      state.username = data
    },
    UserGroup(state, data) {
      state.user_group = data
    },
    RememberBoolean(state,data){
      state.remember_boolean = data
    },
    RememberUsername(state, data){
      state.remember_username = data
    },
    RememberPassword(state,data){
      state.remember_password = data
    }

      
  },
  actions: {

  },
  plugins: [new VuexPersistence().plugin]

})
export default store
