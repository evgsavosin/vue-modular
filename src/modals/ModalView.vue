<script>
import { isEmpty } from 'lodash';

import modals from './modals.js';
import events from './events.js';

export default {
    data: () => ({
        modals,

        currentModal: null,
        currentModalProperties: []
    }),

    mounted() {
        this.$eventBus.$on(events.SHOW_MODAL, (modal, properties) => {
            if (isEmpty(this.modals[modal])) {
                console.warn(`[modal] Modal with name '${modal}' does not exist`);
                return;
            }

            this.currentModal = modal;
            this.currentModalProperties = properties;
        });

        this.$eventBus.$on(events.HIDE_MODAL, (modal) => this.onActionEscape());

    },

    beforeDestroy() {
        this.$eventBus.off(events.SHOW_MODAL);
        this.$eventBus.off(events.HIDE_MODAL);
    },

    computed: {
        modal: {
            get() {
                const { modals, currentModal } = this;
                return modals[currentModal];
            }
        }
    },

    methods: {
        /**
         * Escape action event
         */
        onActionEscape() {
            this.currentModal = null;
            this.currentModalProperties = [];
            this.$forceUpdate();
        }
    }
};
</script>

<template>
    <div class="modal-view" v-if="!$_.isNil(currentModal)">
        <div 
            class="modal-view__inner" 
            v-bind:class="`
                ${$_.has(modal.properties, 'hideBackground') && modal.properties.hideBackground ? 'modal-view__inner--without-background' : ''}
            `">

            <component 
                v-bind:is="modal.component" 
                v-bind="currentModalProperties" 
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';

.modal-view {
    font-family: $default-font;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    outline: 0;
    font-size: 16px;

    &__inner {
        width: 100%;
        height: 100%;
        background-color: $black-color-05;
        display: flex;
        align-items: center;
        justify-content: center;

        &--without-background {
            background-color: transparent;
        }
    }
}
</style>