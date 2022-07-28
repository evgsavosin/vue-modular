/**
 * App factory
 * 
 * @file app-factory.js
 * @author Evgeny Savosin <evg.savosin@gmail.com>
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

 /**
  * Create router factory
  * 
  * @param {Array} routes 
  * @return {VueRouter}
  */
export const createRouter = (routes = []) => {
    Vue.use(VueRouter);
    return new VueRouter({ routes });
};

/**
 * Create store factory
 * 
 * @param {Object} stores 
 * @return {Store}
 */
export const createStore = (stores = {}) => {
    Vue.use(Vuex);
    return new Vuex.Store({ strict: process.env.NODE_ENV !== 'production', modules: stores });
}; 

/**
 * Register vue properties
 * 
 * @returns {Vue}
 */
export const registerVue = (name, value) => {
    Vue.prototype[`$${name}`] = value;
};

/**
 * Create app factory
 * 
 * @param {Array} routes 
 * @param {Object} stores 
 * @return {Vue}
 */
export const createApp = (router, store, appLayout = null, readyCallback = () => {}, mountId = '#app') => {
    return new Vue({ 
        router, 
        store,
        mounted: () => readyCallback(),
        render: h => h(appLayout) 
    }).$mount(mountId);
};