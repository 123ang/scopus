import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   
    host_url: "https://admin.lincoln.com.my/",
    is_login: false,
    
    remember_boolean: false,
    remember_password: "",
    remember_username: "",
  
    script_url:  "php_script/",
    user_id: "",
    username: "",
  },
  getters: {
    
  },
  mutations: {
    DraftName(state,data){
      state.draft_name = data
    },
    DraftID(state,data){
      state.draft_id = data
    },
    EstateID(state, data) {
      state.estate_id = data
    },
    HostUrl(state,host_url) {
      state.host_url = host_url
    },
    IsLogin(state, is_login) {
      state.is_login = is_login
    },
    InstrumentID(state, data) {
      state.instrument_id = data
    },
    InstrumentReference(state, data) {
      state.instrument_reference = data
    },
    ScriptUrl(state,script_url) {
      state.script_url = script_url
    },
    SearchTestator(state, data){
      //this is testator id
      state.search_testator = data
    },
    Username(state, data) {
      state.username = data
    },
    UserID(state, data) {
      state.user_id = data
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
