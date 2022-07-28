/**
 * @file loader.js
 * 
 * Autoload components from module system
 */

import { 
    ROUTE_LOADER,
    STORE_LOADER,
    registerModuleLoader, 
    createModuleLoader 
} from '../utils/module-loader';

// Create loaders
const routeLoader = createModuleLoader(ROUTE_LOADER);
const storeLoader = createModuleLoader(STORE_LOADER);

// Register all modules
registerModuleLoader([
    routeLoader,
    storeLoader
]);

// Export modules
export const routes = routeLoader.getLoadedFiles();
export const stores = storeLoader.getLoadedFiles();