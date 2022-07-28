/**
 * @file scroll-updater.js
 * @author Evgeny Savosin <evg.savosin@gmail.com>
 */

import { MIN_RATIO, NONE_RATIO, DIRECTIONS } from './constants.js';

let scrollUpdaterInstance = [];

const createScrollUpdater = (
    name, 
    el, 
    { 
        direction,
        minRatio
    }
) => {
    const directionName = direction === DIRECTIONS.vertical ? 'Top' : 'Left';
    const elementScalarName = direction === DIRECTIONS.vertical ? 'Height' : 'Width';

    /**
     * 
     * @returns {Object}
     */
    const getItems = () => {
        return el.querySelectorAll(`.${name}-item`);
    };

    /**
     * 
     * @returns {Number}
     */
    const getItemValue = () => {
        const items = getItems();

        if (items.length <= 1) {
            return 0;
        }

        const offsetFirst = items[0][`offset${directionName}`];
        const offsetSecond = items[1][`offset${directionName}`];
        const clientValue = items[0][`client${elementScalarName}`]

        return Math.round(clientValue + ((offsetSecond - offsetFirst) - clientValue));
    };

    /**
     * 
     * @param {Number} value 
     * @param {Number} elementViewValue 
     * @returns 
     */
    const getViewItemsCount = (value, elementViewValue) => {
        return Math.round(elementViewValue / value);
    };

    /**
     * Update scroll scalar 
     * 
     * @param {Number} index 
     */
    const update = (index) => {
        if (index === null) {
            return;
        }

        // Window ratio
        let ratio = window.innerWidth / window.innerHeight;
        ratio = ratio <= minRatio ? minRatio : ratio;

        if (minRatio == NONE_RATIO) {
            ratio = NONE_RATIO;
        }

        // Scroll (left or top) and scalar value (width or height)
        const elementScroll = el[`scroll${directionName}`];
        const elementScalar = el[`client${elementScalarName}`];

        // Get base values: item width and count of items in viewport
        const itemValue = getItemValue();
        const countViewItems = getViewItemsCount(itemValue, elementScalar);

        // Calculate scroll direction values
        const calculatedScrollFirst = (itemValue * (index));
        const calculatedScrollSecond = (itemValue * (index - countViewItems + (1 * ratio)));

        if (elementScroll < calculatedScrollSecond) {
            el[`scroll${directionName}`] = calculatedScrollSecond;
        } else if (elementScroll > calculatedScrollFirst) {
            el[`scroll${directionName}`] = calculatedScrollFirst;
        }
    };

    return {
        update
    };
};

export default {
    /**
     * Create scroll updater instance
     * 
     * @param {Object} el 
     * @param {Object} binding 
     * @param {Object} vnode 
     */
    inserted: (el, binding, vnode) => {
        const { 
            name, 
            direction = DIRECTIONS.vertical, 
            minRatio = MIN_RATIO 
        } = binding.value;

        scrollUpdaterInstance.push({
            name,
            instance: createScrollUpdater(name, el, { direction, minRatio })
        });
    },

    /**
     * Update scroll updater
     * 
     * @param {Object} el 
     * @param {Object} binding 
     * @param {Object} vnode 
     */
    componentUpdated: (el, binding, vnode) => {
        const { 
            name, 
            index, 
            canUpdate = true 
        } = binding.value;

        if (!canUpdate) {
            return;
        }

        scrollUpdaterInstance.forEach((item) => {
            if (item.name == name) {
                item.instance.update(index);
            }
        });
    },

    /**
     * Destroy scroll updater
     */
    unbind: (el, binding, vnode) => {
        const { name } = binding.value;
        
        scrollUpdaterInstance = scrollUpdaterInstance.filter((item) => item.name != name);
    }
 };
