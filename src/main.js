import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)



import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false


router.onError((error) => {
    console.log("Aa")
    _this = this
    _this.$router.push({ path: "/" })
        // const pattern = /Loading chunk (\d)+ failed/g;
        // const isChunkLoadFailed = error.message.match(pattern);
        // const targetPath = router.history.pending.fullPath;
        // if (isChunkLoadFailed) {
        //     router.replace(targetPath);
        // }
});

new Vue({
    router,
    store,
    render: function(h) { return h(App) }
}).$mount('#app')