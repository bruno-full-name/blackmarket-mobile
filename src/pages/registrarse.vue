<template>
    <f7-page class="theme-black">
        <f7-navbar style="background-color: #b24e3a" title="Registrarse" back-link="Volver"></f7-navbar>
        <div class="ui text container" style="padding: 20px; margin: 0">
            <f7-list form>
                <f7-list-item style="width: 100%">
                    <f7-label floating>Ingrese su username</f7-label>
                    <f7-input type="text" v-model="username"/>
                </f7-list-item>
                <f7-list-item style="width: 100%">
                    <f7-label floating>Ingrese su password</f7-label>
                    <f7-input type="password" v-model="password"/>
                </f7-list-item>
                <f7-list-item style="width: 100%">
                    <f7-label floating>Ingrese su email</f7-label>
                    <f7-input type="email" v-model="email"/>
                </f7-list-item>
            </f7-list>
            <f7-button @click="registrarUsuario" big raised fill>Confirmar</f7-button>
        </div>
        <div class="ui center aligned text container" style="padding: 20px">
            <h3 class="ui header text-bm-red">Registrarse con redes sociales</h3>
            <button @click="registrarUsuarioFacebook" class="ui facebook icon button large">
                <i class="facebook f large icon"></i>
            </button>
        </div>
    </f7-page>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                email: ''
            }
        },
        computed: {
            registrarUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/registrarse";
            }
        },
        methods: {
            registrarUsuario() {
                if (this.username !== '' && this.password !== '') {
                    var _this = this;
                    $.post(this.registrarUsuarioURL, "username=" + this.username + "&password=" + this.password + "&email=" + this.email, function (response) {
                        if (response === true) {
                            _this.mostrarNotificacion("Registro completado!", 3000);
                            _this.$store.commit('setUsername', _this.username);
                            _this.$store.commit('setAutenticado', true);
                            _this.$cookie.set('username', _this.username);
                            _this.$router.load({
                                url: '/inicio/',
                                reload: true
                            });
                            _this.mostrarNotificacion("Bienvenido a Blackmarket!", 4000);
                        } else _this.mostrarNotificacion("No se pudo completar el registro", 3000);
                    }).fail(function () {
                        _this.mostrarNotificacion("No se pudo enviar solicitud. Por favor vuelve a intentar...", 3000);
                    });
                } else this.mostrarNotificacion("Debes ingresar un username y password!", 3000);
            },
            registrarUsuarioFacebook() {
                var _this = this;
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        FB.api('/me', {fields: 'email'}, function (response) {
                            $.post(_this.registrarUsuarioURL, "username=" + response['email'] + "&password=" + "&email=" + response['email'], function (data) {
                                if (data === true) {
                                    _this.mostrarNotificacion("Registro completado!", 3000);
                                    _this.$store.commit('setUsername', _this.username);
                                    _this.$store.commit('setAutenticado', true);
                                    _this.$cookie.set('username', _this.username);
                                    _this.$router.load({
                                        url: '/inicio/',
                                        reload: true
                                    });
                                    _this.mostrarNotificacion("Bienvenido a Blackmarket!", 4000);
                                } else _this.mostrarNotificacion("No se pudo completar el registro", 3000);
                            }).fail(function () {
                                _this.mostrarNotificacion("No se pudo enviar solicitud. Por favor vuelve a intentar...", 3000);
                            });
                        });
                    }
                    else {
                        FB.login();
                    }
                });

            },
            mostrarNotificacion(title, duration) {
                this.$f7.addNotification({
                    message: title,
                    hold: duration,
                    closeOnClick: true
                });
            }
        }
    }
</script>