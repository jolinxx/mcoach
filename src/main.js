// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vant from 'vant';
import './assets/js/rem.js';
import 'vant/lib/index.css';
import router from './router';
import echarts from 'echarts';


Vue.config.productionTip = false

//Vue.use(Vant);
//
//router.beforeEach((to, from, next) => {
//  Vant.LoadingBar.start();
//  next();
//});
//
//router.afterEach(route => {
//  Vant.LoadingBar.finish();
//});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
