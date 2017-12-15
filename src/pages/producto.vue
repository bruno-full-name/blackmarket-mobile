<template>
    <f7-page class="theme-black">
        <f7-navbar style="background-color: #b24e3a" :title="nombre || 'Producto desconocido...'"
                   back-link="Volver">
        </f7-navbar>
        <f7-fab color="black" @click="agregarAlCarrito">
            <i class="add to cart icon large"></i>
        </f7-fab>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{empresa}}
            </h3>
            <h3 class="ui header">
                <i class="tag grey icon"></i>{{tipo}}
            </h3>
            <h3 class="ui header">
                <i class="dollar grey icon"></i>{{precio}}
            </h3>
            <h3 class="ui header">
                <i class="barcode grey icon"></i>{{codigo}}
            </h3>
            <h3 class="ui header">
                <i :class="{'checkmark grey icon': stock > 0, 'warning orange icon': stock === 0}"></i>
                {{stock > 0 ? 'Hay stock disponible' : 'No hay stock'}}
            </h3>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                precio: 0,
                tipo: '',
                codigo: '',
                stock: 0
            }
        },
        props: ['id', 'nombre', 'empresa'],
        mounted() {
            this.obtenerProducto();
        },
        computed: {
            obtenerProductoURL() {
                return this.$store.state.baseUrl + "productos/" + this.id;
            }
        },
        methods: {
            obtenerProducto() {
                if (this.id !== undefined && this.id !== '' && this.id != null) {
                    var _this = this;
                    $.get(this.obtenerProductoURL, function (response) {
                        if (response !== undefined) {
                            _this.precio = response.precio || 0;
                            _this.tipo = response.tipoProducto || 'Desconocido...';
                            _this.codigo = response.codigoDeBarra || '';
                            _this.stock = response.stock || 'Desconocido...';
                        }
                    });
                }
            },
            agregarAlCarrito() {
                var producto = {
                    id: this.id,
                    nombre: this.nombre,
                    empresa: this.empresa,
                    precio: this.precio || 0,
                    stock: this.stock || 0,
                    cantidad: 1
                };
                this.$store.commit('agregarProducto', producto);
                this.$storage.remove('carrito');
                this.$storage.set('carrito', this.$store.state.productos);
                this.mostrarNotificacion("Producto agregado al carrito!", 3000);
            },
            mostrarNotificacion(title, duration) {
                this.$f7.addNotification({
                    message: title,
                    hold: duration,
                    closeOnClick: true
                });
            },
        }
    }
</script>