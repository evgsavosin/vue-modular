/**
 * @file number-format.js
 */

export const numberFormat = (value) => {
    if (isNaN(value = parseInt(value))) {
        return 0;
    }

    return new Intl.NumberFormat().format(value);
};
