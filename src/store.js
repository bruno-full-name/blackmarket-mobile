import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        baseUrl: 'http://localhost/blackMarket/api/web/v1/',
        autenticado: false,
        username: '',
        productos: []
    },
    mutations: {
        setAutenticado(state, autenticado) {
            state.autenticado = autenticado;
        },
        setUsername(state, username) {
            state.username = username;
        },
        agregarProducto(state, producto) {
            var prod = state.productos.find(p => p.id === producto.id);
            if (prod === undefined) state.productos.push(producto);
            else prod.cantidad += 1;
        },
        quitarProducto(state, id) {
            state.productos = state.productos.filter(function (producto) {
                return producto.id !== id;
            });
        },
        setProductos(state, productos) {
            state.productos = productos;
        },
        actualizarCantidad(state, producto) {
            var prod = state.productos.find(p => p.id === producto.id);
            if (prod !== undefined) prod.cantidad = producto.cantidad;
        }
    }
});