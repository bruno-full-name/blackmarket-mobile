<template>
    <f7-page class="theme-black">
        <f7-navbar style="background-color: #b24e3a" :title="nombre || 'Producto desconocido...'"
                   back-link="Volver">
        </f7-navbar>
        <f7-fab color="black">
            <i class="trash icon large"></i>
        </f7-fab>
        <div class="ui left aligned basic segment" style="margin-top: 60px; padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{empresa}}
            </h3>
            <h3 class="ui header">
                <i class="dollar grey icon"></i>{{precio}}
            </h3>
            <f7-list form>
                <f7-list-item>
                    <f7-label>Cantidad</f7-label>
                    <f7-input min="1" @change="actualizarCantidad" v-model="cant" type="number"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label class="text-bm-red">Sub total</f7-label>
                    <f7-input readonly :value="cantidad*precio" type="number"/>
                </f7-list-item>
            </f7-list>
        </div>
    </f7-page>
</template>
<script>
    export default {
        props: ['id', 'nombre', 'empresa', 'precio', 'cantidad'],
        data() {
            return {
                cant: 0
            }
        },
        mounted() {
            this.cant = this.cantidad;
        },
        methods: {
            quitarProductoDelCarrito() {
                if (this.id !== undefined && this.id !== null && this.id !== '') {
                    this.$store.commit('quitarProducto', this.id);
                    this.$storage.remove('carrito');
                    this.$storage.set('carrito', this.$store.state.productos);
                    this.mostrarNotificacion("Producto quitado del carrito!", 3000);
                }
            },
            actualizarCantidad() {
                this.$store.commit('actualizarCantidad', {
                    id: this.id,
                    cantidad: this.cant
                });
                this.$storage.remove('carrito');
                this.$storage.set('carrito', this.$store.state.productos);
            },
            mostrarNotificacion(title, duration) {
                this.$f7.addNotification({
                    message: title,
                    hold: duration,
                    closeOnClick: true
                });
            },
        },
        watch: {
            cantidad(newValue, oldValue) {
                this.cant = newValue;
            }
        }
    }
</script>