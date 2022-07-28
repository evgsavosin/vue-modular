/**
 * @file main.js
 */

require(`./environments/${process.env.NODE_ENV}.js`);

import _ from 'lodash';
import Vue from 'vue';
const plural = require('plural-ru');

import App from './App.vue';
import { routes, stores } from './modules/loader';
import { 
    createApp, 
    createRouter,
    createStore,
    registerVue 
} from './utils/app-factory.js';
import eventBus from './event-bus.js';
import registerVueModalEvents from './modal.js';
 
// Plugins
const router = createRouter(routes);
const store = createStore(stores);

// Settings
Vue.config.productionTip = false;
registerVue('_', _);
registerVue('plural', plural);
registerVueModalEvents(eventBus, store);

// Create app
global.app = createApp(router, store, App);