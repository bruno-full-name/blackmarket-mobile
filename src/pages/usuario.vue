<template>
    <f7-page>
        <div class="ui left aligned basic segment" style="padding: 20px">
            <h3 class="ui header">
                <i class="user circle outline grey icon"></i>{{username}}
            </h3>
            <h3 class="ui header">
                <i class="at grey icon"></i>{{email}}
            </h3>
            <h3 class="ui header">
                <i class="calendar grey icon"></i>Usuario desde: {{fecha}}
            </h3>
            <f7-button href="/login/" :reload="true" @click="logout" fill color="black" raised
                       style="margin-top: 20px; width: 40%">
                Cerrar Sesi&oacute;n
            </f7-button>
        </div>
        <f7-toolbar bottom style="background-color: #b24e3a">
            <f7-link href="/inicio/">
                <i class="home icon big" style="padding: 0; margin-top: 0"></i>
            </f7-link>
            <f7-link href="/carrito/"><i class="cart icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/pedidos/"><i class="shipping icon big" style="padding: 0; margin-top: 0"></i></f7-link>
            <f7-link href="/usuario/"><i class="user icon big" style="padding: 0; margin-top: 0"></i></f7-link>
        </f7-toolbar>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                email: '',
                fecha: ''
            }
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            obtenerUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/username?username=" + this.username;
            }
        },
        mounted() {
            this.obtenerUsuario();
        },
        methods: {
            obtenerUsuario() {
                if (this.username !== undefined && this.username !== '') {
                    var _this = this;
                    $.get(this.obtenerUsuarioURL, function (response) {
                        var fecha = new Date(response["created_at"]);
                        _this.fecha = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear();
                        _this.email = response.email;
                    });
                }
            },
            logout() {
                this.$store.commit('setUsername', '');
                this.$store.commit('setAutenticado', false);
                this.$cookie.delete('username');
                this.$storage.remove('carrito');
            }
        }
    }
</script>