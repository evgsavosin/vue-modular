/**
 * @file event-bus.js
 */

import Vue from 'vue';
import { registerVue } from './utils/app-factory.js';

export const eventBus = new Vue();
registerVue('eventBus', eventBus);

export default eventBus;