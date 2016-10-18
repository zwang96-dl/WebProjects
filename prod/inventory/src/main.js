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


Vue.use(Router);
Vue.use(VueResource);
Vue.http.options.root = '/client_inventory';
Vue.use(VueTables.client, {
  highlightMatches: true,
  filterByColumn: true,
  texts: {
    filter: "Search:"
  },
});

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
