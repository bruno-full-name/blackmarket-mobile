<template>
    <div id="app">
        <f7-statusbar></f7-statusbar>
        <f7-views>
            <f7-view main>
                <f7-pages>
                    <login-page v-if="!autenticado"></login-page>
                    <inicio-page v-if="autenticado"></inicio-page>
                </f7-pages>
            </f7-view>
        </f7-views>
    </div>
</template>

<script>
    export default {
        computed: {
            autenticado() {
                return this.$store.state.autenticado;
            }
        },
        mounted() {
            this.checkSesionUsuario();
        },
        methods: {
            checkSesionUsuario() {
                var username = this.$cookie.get('username');
                if (username !== null && username !== "") {
                    this.$store.commit('setUsername', username);
                    this.$store.commit('setAutenticado', true);
                    if (this.$storage.get('carrito') !== null) this.$store.commit('setProductos', this.$storage.get('carrito'));
                }
            }
        }
    }
</script>
<style>
    .bm-red {
        color: #f6f9f9;
        background-color: #b24e3a !important
    }

    .bm-dark {
        color: #f6f9f9 !important;
        background-color: #000000 !important
    }

    .border-top-bm-red {
        border-color: #b24e3a !important;
        border-top-style: solid;
        border-top-width: 3px
    }

    .border-left-bm-red {
        border-color: #b24e3a !important;
        border-left-style: solid;
        border-left-width: 3px
    }

    .border-bottom-bm-red {
        border-color: #b24e3a !important;
        border-bottom-style: solid;
        border-bottom-width: 3px
    }

    .border-top-bm-dark {
        border-color: #000000 !important;
        border-top-style: solid;
        border-top-width: 3px
    }

    .border-left-bm-dark {
        border-color: #000000 !important;
        border-left-style: solid;
        border-left-width: 3px
    }

    .border-bottom-bm-dark {
        border-color: #000000 !important;
        border-bottom-style: solid;
        border-bottom-width: 3px
    }

    .hover-bm-red:hover {
        color: #f6f9f9 !important;
        background-color: #b24e3a !important
    }

    .hover-bm-dark:hover {
        color: #f6f9f9 !important;
        background-color: #000000 !important
    }

    .hover-text-bm-red:hover {
        color: #b24e3a !important
    }

    .hover-text-bm-dark:hover {
        color: #000000 !important
    }

    .hover-border-bm-red:hover {
        border-color: #b24e3a !important
    }

    .hover-border-bm-dark:hover {
        border-color: #000000 !important
    }

    .text-bm-red {
        color: #b24e3a !important
    }

    .text-bm-dark {
        color: #000000 !important
    }

    .bm-f1 {
        background-color: #f1f5f9 !important
    }

    .hover-bm-f1:hover {
        background-color: #f1f5f9 !important
    }

    .hover-text-bm-f1:hover {
        color: #f1f5f9 !important
    }

    .text-bm-f1 {
        color: #f1f5f9 !important
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        background-color: rgba(178, 78, 58, .1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(178, 78, 58, .3);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(178, 78, 58, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(178, 78, 58, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(178, 78, 58, .5);
    }
</style>