import Vue from 'vue'
import Framework7 from 'framework7';
import Framework7Vue from 'framework7-vue';
import 'framework7/dist/css/framework7.material.min.css';
import 'framework7/dist/css/framework7.material.colors.min.css';
import './assets/semantic.min.css';
import './assets/jquery';
import './assets/semantic.min';
import Routes from './routes.js';
import App from './app';
import {store} from './store';
import VueCookie from 'vue-cookie';
import Inicio from './pages/inicio';
import Carrito from './pages/carrito';
import PedidoItem from './pages/PedidoItem';
import Producto from './pages/producto';
import usuario from './pages/usuario';
import Login from './pages/login.vue';
import Pedidos from './pages/pedidos.vue';
import CarritoItem from './pages/CarritoItem.vue';
import Vuebar from 'vuebar';
import Storage from 'vue-web-storage';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBvF2bHcbmE6A1hrMLFfdbaR9nom8clN-U',
        libraries: 'places',
    }
});
Vue.use(Storage);
Vue.use(Vuebar);
Vue.component('inicio-page', Inicio);
Vue.component('pedido-item-page', PedidoItem);
Vue.component('productos-page', Producto);
Vue.component('carrito-page', Carrito);
Vue.component('usuario-page', usuario);
Vue.component('pedidos-page', Pedidos);
Vue.component('carrito-item-page', CarritoItem);
Vue.component('login-page', Login);
Vue.use(VueCookie);
Vue.use(Framework7Vue);

new Vue({
    el: '#app',
    template: '<app/>',
    store,
    framework7: {
        root: '#app',
        material: true,
        routes: Routes,
    },
    components: {
        app: App
    }
});
