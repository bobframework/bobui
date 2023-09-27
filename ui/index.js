export const LoadMiniBobUI = (...names) => {
    names.forEach(name => {
        name();
    });
}

export * from './button/index.js';
export * from './label/index.js';
export * from './link/index.js';
export * from './rating/index.js';