/**
 * Helpers
 * 
 * @file helpers.js
 * @author Evgeny Savosin <evg.savosin@gmail.com>
 */

/**
 * @return {Boolean}
 */
export const isEnvironmentDevelopment = () => {
    return process.env === 'development';
};