import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource'
import VueTables from 'vue-tables'
import OrderView from './components/order/OrderView.vue';
import StatusView from './components/StatusView.vue';
import ReceiveView from './components/ReceiveView.vue';
import ShippingView from './components/ShippingView.vue';
import App from './App';
import store from './vuex/store'



/* eslint-disable no-new */

Vue.use(Router);
Vue.use(VueResource);
Vue.http.options.root = '/client_inventory';
Vue.use(VueTables.client, {
  compileTemplates: true,
  highlightMatches: true,
  //pagination: {
  // dropdown:true
  // chunk:5
  // },
  filterByColumn: true,
  texts: {
    filter: "Search:"
  },
  // datepickerOptions: {
  //   showDropdowns: true
  // }
  //skin:''
});

// register filters gloabally
Vue.filter();

const router = new Router();

router.map({
        '/receive': {
            component: ReceiveView,
        },
        '/order': {
            component: OrderView,
        },
        '/shipingpending': {
            component: ShippingView
        },
        '/status': {
            component: StatusView,
        }
});

router.beforeEach(() => {
  window.scrollTo(0, 0);
});

router.redirect({
  '*': '/order',
});

router.start({
    store,
    components: {App}
}, '#app');
