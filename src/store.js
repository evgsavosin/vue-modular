/**
 * @file store.js
 */

export default {
    state: {
        modal: null,
    },

    mutations: {
        SET_MODAL: (state, modal) => state.modal = modal
    },

    actions: {
        setModal: ({ commit }, modal) => commit('SET_MODAL', modal),
    }
}