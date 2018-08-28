import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const indexTemp = localStorage.getItem("index") == null? "2":localStorage.getItem("index");
export default new Vuex.Store({
    state: {
        count: 0,
        adminleftnavnum:indexTemp //管理后台左侧导航
    },
    mutations: {
        increment:function(state) {
            state.count++
        }
    }
});
