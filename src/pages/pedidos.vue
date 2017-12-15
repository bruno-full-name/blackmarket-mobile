<template>
    <f7-page class="theme-black">
        <f7-navbar class="theme-black">
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
            <f7-nav-right style="margin-top: -40px">

            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar bottom style="background-color: #b24e3a">
            <f7-link href="/inicio/">
                <i class="home icon big" style="padding: 0; margin-top: 0"></i>
            </f7-link>
            <f7-link href="/carrito/"><i class="cart icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/pedidos/"><i class="shipping icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/usuario/"><i class="user icon big" style="padding: 0; margin-top: 0"></i></f7-link>
        </f7-toolbar>
        <div class="ui relaxed divided items" style="padding-top: 20px">
            <f7-list :no-hairlines-between="true" :no-hairlines="true">
                <template v-for="pedido in pedidos">
                    <f7-list-item
                            media-list
                            :link="'/pedido-item/' + pedido.id + '/' + pedido.fecha + '/' + pedido.destino + '/' + pedido.estado"
                            class="ui link item hover-bm-f1 text-bm-black hover-text-bm-red"
                            style="cursor: pointer; padding:7px">
                        <div slot="inner-start" style="width:inherit">
                            <h2 class="ui header" style="font-weight: 500; margin: 0; padding: 0; color: inherit">
                                {{pedido.fecha}}
                                <h4 class="ui header" style="margin-top: 10px; border: 0">
                                    <i :class="{'green checkmark': pedido.estado === 'Terminado', 'spinner orange': pedido.estado === 'Procesando', 'shipping blue': pedido.estado === 'Enviando', 'warning orange': pedido.estado !== 'Procesando' && pedido.estado !== 'Enviando' && pedido.estado !== 'Terminado'}"
                                       class="icon"></i>
                                    {{pedido.estado}}
                                </h4>
                                <h4 class="ui header" style="margin-top: 5px; border: 0">
                                    <i class="marker grey icon"></i>
                                    {{pedido.destino}}
                                </h4>
                            </h2>
                        </div>
                    </f7-list-item>
                </template>
            </f7-list>
        </div>
        <infinite-loading ref="infiniteLoading"
                          style="padding: 0px 0px 20px;margin-bottom: 40px"
                          @infinite="listarPedidos">
            <div slot="no-more">
                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                        class="search icon text-bm-red"></i>No hay m&aacute;s resultados.
                </h3>
            </div>
            <div slot="no-results">
                <h3 class="ui header text-paperviu-d7" style="opacity: 0.6"><i
                        class="search icon text-bm-red"></i>No hay resultados que mostrar.
                </h3>
            </div>
        </infinite-loading>
    </f7-page>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                pagina: 1,
                pedidos: []
            }
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            listarPedidosURL() {
                return this.$store.state.baseUrl + "pedidos/usuario?username=" + this.username + "&pagina=" + this.pagina;
            }
        },
        mounted() {
            this.pagina = 1;
            this.pedidos = [];
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        },
        methods: {
            listarPedidos($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarPedidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, pedido) {
                                    _this.pedidos.push(pedido);
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            logout() {
                this.$store.commit('setUsername', '');
                this.$store.commit('setAutenticado', false);
                this.$cookie.delete('username');
                this.$storage.remove('carrito');
            }
        },
        components: {
            InfiniteLoading,
        },
    }
</script>