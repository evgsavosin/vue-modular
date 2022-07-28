<script>
import { ROUTE_DEFAULT } from '@/constants/utils.js';

import ModalView from '@/modals/ModalView.vue';

import '@/assets/scss/fonts/GothamPro.scss';

export default {
    components: {
        ModalView
    },

    data: () => ({
        ROUTE_DEFAULT,

        environment: process.env.NODE_ENV
    })
};
</script>

<template>
    <div class="app" id="app">
        <div v-bind:class="`app-bg app-bg--${environment}`"></div>

        <!-- Routing modules -->
        <div v-if="$route.name !== ROUTE_DEFAULT" class="app__module">
            <router-view />
        </div>

        <!-- Show head up modal on main (Hud + Module) interface -->
        <modal-view />
    </div>
</template>