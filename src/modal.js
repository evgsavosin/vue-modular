/**
 * @file modal.js
 */

import { registerVue } from './utils/app-factory.js';
import events from './modals/events.js';

export const registerVueModalEvents = (eventBus, store) => {
    registerVue('showModal', (modal, properties) => {
        store.dispatch('default/setModal', modal);
        eventBus.$emit(events.SHOW_MODAL, modal, properties);
    });
    
    registerVue('hideModal', (modal) => {
        store.dispatch('default/setModal', null);
        eventBus.$emit(events.HIDE_MODAL, modal);
    });
};

export default registerVueModalEvents;