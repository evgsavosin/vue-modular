/**
 * @file routes.js
 */

import Example from './Example.vue';

export default {
    path: '/example',
    name: 'example',
    component: Example,
    props: ({ query }) => ({
        foo: query.foo || ''
    })
};