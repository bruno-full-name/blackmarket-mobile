<template>
    <f7-page class="hide-bars-on-scroll" main="true" name="inicio">
        <f7-navbar class="theme-black" sliding>
            <f7-nav-center><img src="../assets/blackMarket.gif" style="height: 50px; margin-top: 25px"></f7-nav-center>
            <f7-nav-right style="margin-top: -40px">
                <f7-link icon="search" style="margin: 0" open-popover="#popover"></f7-link>
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
        <f7-popover id="popover">
            <f7-list form>
                <f7-list-item>
                    <f7-label floating>Nombre</f7-label>
                    <f7-input v-model="filtro" @keyup.enter="resetProductos" type="text"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>Precio Min</f7-label>
                    <f7-input v-model="precioMin" @keyup.enter="resetProductos" type="number"/>
                </f7-list-item>
                <f7-list-item>
                    <f7-label floating>Precio Max</f7-label>
                    <f7-input v-model="precioMax" @keyup.enter="resetProductos" type="number"/>
                </f7-list-item>
                <f7-block-title style="margin-top: 0" class="text-bm-red">Filtrar por categor&iacute;a</f7-block-title>
                <div class="ui selection secondary link list">
                    <div class="ui link item hover-bm-f1"
                         :class="{'bm-f1 text-bm-red': categoria === '', 'hover-bm-f1 text-bm-black hover-text-bm-red': '' !== categoria}"
                         @click="categoria = ''; resetProductos();">
                        <h4 class="ui header"
                            style="font-weight: 500; padding: 7px; color: inherit">Todos</h4>
                    </div>
                    <template v-for="cat in categorias">
                        <div class="ui item hover-bm-e8"
                             :class="{'bm-f1 text-bm-red': categoria === cat.nombre, 'hover-bm-f1 text-bm-black hover-text-bm-red': cat.nombre !== categoria}"
                             @click="categoria = cat.nombre; resetProductos();">
                            <h4 class="ui header"
                                style="font-weight: 500; padding: 7px; color:inherit">{{cat.nombre}}</h4>
                        </div>
                    </template>
                </div>
            </f7-list>
        </f7-popover>
        <div class="ui relaxed divided items" style="padding-top: 10px">
            <f7-list :no-hairlines-between="true" :no-hairlines="true">
                <template v-for="prod in productos">
                    <f7-list-item
                            :link="'/productos/' + prod.id + '/'+ prod.nombre + '/'+prod.empresa"
                            class="ui link item hover-bm-f1 text-bm-black hover-text-bm-red"
                            style="cursor: pointer; padding:7px">
                        <f7-swipeout-actions>
                            <f7-swipeout-button delete>Eliminar</f7-swipeout-button>
                        </f7-swipeout-actions>
                        <div slot="inner-start" style="width:inherit">
                            <h2 class="ui header" style="font-weight: 500; margin: 0; padding: 0; color: inherit">
                                {{prod.nombre}}
                                <h4 class="ui header" style="margin-top: 5px; border: 0"><i
                                        class="user outline circle icon grey"></i>{{prod.empresa}}
                                </h4>
                            </h2>
                        </div>
                    </f7-list-item>
                </template>
            </f7-list>
        </div>
        <infinite-loading ref="infiniteLoading"
                          style="padding: 0px 0px 20px;margin-bottom: 40px"
                          @infinite="listarProductos">
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
                filtro: '',
                categoria: '',
                precioMin: 0,
                precioMax: 0,
                pagina: 1,
                productos: [],
                categorias: [],
                verProducto: false,
                producto: {
                    id: '',
                    nombre: '',
                    empresa: ''
                }
            }
        },
        mounted() {
            this.getAllCategorias();
        },
        computed: {
            getAllCategoriasURL() {
                return this.$store.state.baseUrl + "tiposproductos/all";
            },
            listarProductosURL() {
                return this.$store.state.baseUrl + "productos?precioMin=" + this.precioMin + "&precioMax=" + this.precioMax + "&nombre=" + this.filtro + "&categoria=" + this.categoria + "&pagina=" + this.pagina;
            },
            getNombreEmpresaURL() {
                return this.$store.state.baseUrl + "empresas/";
            }
        },
        methods: {
            getAllCategorias() {
                var _this = this;
                $.get(this.getAllCategoriasURL, function (response) {
                    _this.categorias = response;
                }).fail(function () {
                    _this.getAllCategorias();
                });
            },
            listarProductos($state) {
                if (this.precioMin === "") this.precioMin = 0;
                if (this.precioMax === "") this.precioMax = 0;
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarProductosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, producto) {
                                    $.get(_this.getNombreEmpresaURL + producto.empresa + "?fields=nombre", function (response2) {
                                        _this.productos.push({
                                            id: producto.id,
                                            nombre: producto.nombre || 'Desconocido...',
                                            empresa: response2.nombre || 'Desconocido...',
                                            precio: producto.precio || 0,
                                        });
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            resetProductos() {
                this.pagina = 1;
                this.productos = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
                this.$f7.closeModal();
            }
        },
        components: {
            InfiniteLoading,
        },
    }
</script>