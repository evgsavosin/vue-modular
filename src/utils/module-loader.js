/**
 * Module loader
 * 
 * @file module-loader.js
 * @author Evgeny Savosin <evg.savosin@gmail.com>
 */

import { has, merge } from 'lodash';

// Constants
export const NONE_LOADER = 'none';
export const ROUTE_LOADER = 'routes';
export const STORE_LOADER = '(stores\/(.+)|store)';

/**
 * @param {String} moduleName 
 */
const formatModuleName = (moduleName) => {
    let upperCharacterLength = 0;
        
    for (let i = 0; i < moduleName.length; i++) {
        if (moduleName[i].match(/[A-Z]+/) !== null) {
            upperCharacterLength++;
        }
    }

    if (upperCharacterLength == moduleName.length) {
        return moduleName.toLowerCase();
    }

    return moduleName[0].toLowerCase() + moduleName.slice(1);
};

/**
 * Create module loader instance
 * 
 * @param {object} param 
 */
export const createModuleLoader = (type = NONE_LOADER) => {
    if (type == NONE_LOADER) {
        throw new Error('Loader type not passed, when creating module loader');
    }

    let loadedFiles = [];

    /**
     * Get type scanning
     */
    const getType = () => type;

    /**
     * Get loaded files
     */
    const getLoadedFiles = () => {
        const type = getType();
        let formattedLoadFiles = null;

        if (type === ROUTE_LOADER) {
            formattedLoadFiles = [];
            loadedFiles.forEach(key => formattedLoadFiles.push(key.context.default));
        } else if (type === STORE_LOADER) {
            formattedLoadFiles = [];

            loadedFiles.forEach((key) => {
                const moduleName = formatModuleName(key.module);
                
                if (has(formattedLoadFiles[moduleName], 'namespaced')) {
                    delete formattedLoadFiles[moduleName].namespaced;
                }

                formattedLoadFiles[moduleName] = Object.assign(
                    { namespaced: true }, 
                    merge(key.context.default, formattedLoadFiles[moduleName])
                );
            });
        }

        return formattedLoadFiles || loadedFiles;
    };

    /**
     * Add loaded file by context
     * 
     * @param {string} module 
     * @param {object} context 
     */
    const addLoadedFile = (module, context) => {
        loadedFiles.push({ module, context });
    }

    return {
        getType,
        getLoadedFiles,
        addLoadedFile
    };
};

/**
 * Register module loader
 * 
 * @param {object} loader 
 */
export const registerModuleLoader = (loaders = []) => {
    loaders.forEach((loader) => {
        const loaderType = loader.getType();
        const context = require.context('../modules', true, /\.js$/);

        context.keys().forEach((filePath) => {
            const regexExpression = new RegExp(`${loaderType}\.js$`);

            if (filePath.match(regexExpression) === null) {
                return;
            }

            const moduleName = filePath.match(/^\.\/([A-Z]{1}[a-z]+)\//i);

            loader.addLoadedFile(
                moduleName[1],
                context(filePath)
            );
        });
    });
};