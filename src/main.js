/**
 * I, Nenad Skocic, 000107650 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgment.
 */
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount('#app')
